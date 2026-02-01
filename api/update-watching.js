// Vercel serverless function to receive watching updates

// Allowed origins for CORS (security fix - no more wildcard)
const ALLOWED_ORIGINS = [
  'https://foxems.vercel.app',
  'https://foxems.vercel.app/',
  // Chrome extensions send origin as 'chrome-extension://...'
  // We allow all extension origins since they need API key anyway
];

// CORS headers helper - validates origin before allowing
const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin || '';
  
  // Allow specific origins OR chrome extensions OR no origin (direct curl/server requests)
  const isAllowed = !origin || 
    ALLOWED_ORIGINS.includes(origin) || 
    origin.startsWith('chrome-extension://') ||
    origin.startsWith('moz-extension://') ||
    origin.includes('localhost') ||
    origin.includes('127.0.0.1');
  
  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  } else {
    // For disallowed origins, set to our main domain (request will fail CORS check)
    res.setHeader('Access-Control-Allow-Origin', 'https://foxems.vercel.app');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
  return res;
};

// Rate limiting using Redis (protects Upstash quota)
const rateLimiter = {
  async check(redis, identifier, maxRequests = 30, windowSeconds = 60) {
    const key = `ratelimit:${identifier}`;
    
    try {
      // Get current count
      const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
      const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
      if (!url || !token) return { allowed: true }; // Skip if no Redis
      
      // Use INCR with EXPIRE for atomic rate limiting
      const incrResponse = await fetch(`${url}/incr/${key}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const incrData = await incrResponse.json();
      const count = incrData.result || 0;
      
      // Set expiry on first request
      if (count === 1) {
        await fetch(`${url}/expire/${key}/${windowSeconds}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      if (count > maxRequests) {
        return { allowed: false, count, limit: maxRequests };
      }
      
      return { allowed: true, count, limit: maxRequests };
    } catch (e) {
      console.error('Rate limit check error:', e);
      return { allowed: true }; // Allow on error to not block legitimate requests
    }
  }
};

// Input validation with length limits (prevents abuse)
const validateInput = (body) => {
  const errors = [];
  const MAX_TITLE_LENGTH = 200;
  const MAX_EPISODE_LENGTH = 100;
  const MAX_SEASON_LENGTH = 50;
  const MAX_SOURCE_LENGTH = 50;
  
  // Required field
  if (typeof body.isWatching !== 'boolean') {
    errors.push('isWatching must be a boolean');
  }
  
  // Optional string fields with length limits
  if (body.title !== undefined && body.title !== null) {
    if (typeof body.title !== 'string') {
      errors.push('title must be a string');
    } else if (body.title.length > MAX_TITLE_LENGTH) {
      errors.push(`title exceeds ${MAX_TITLE_LENGTH} characters`);
    }
  }
  
  if (body.episode !== undefined && body.episode !== null) {
    if (typeof body.episode !== 'string') {
      errors.push('episode must be a string');
    } else if (body.episode.length > MAX_EPISODE_LENGTH) {
      errors.push(`episode exceeds ${MAX_EPISODE_LENGTH} characters`);
    }
  }
  
  if (body.season !== undefined && body.season !== null) {
    if (typeof body.season !== 'string') {
      errors.push('season must be a string');
    } else if (body.season.length > MAX_SEASON_LENGTH) {
      errors.push(`season exceeds ${MAX_SEASON_LENGTH} characters`);
    }
  }
  
  if (body.source !== undefined && body.source !== null) {
    if (typeof body.source !== 'string') {
      errors.push('source must be a string');
    } else if (body.source.length > MAX_SOURCE_LENGTH) {
      errors.push(`source exceeds ${MAX_SOURCE_LENGTH} characters`);
    }
  }
  
  // Progress validation
  if (body.progress !== undefined && body.progress !== null) {
    if (typeof body.progress !== 'object') {
      errors.push('progress must be an object');
    } else {
      if (body.progress.current !== undefined && typeof body.progress.current !== 'number') {
        errors.push('progress.current must be a number');
      }
      if (body.progress.duration !== undefined && typeof body.progress.duration !== 'number') {
        errors.push('progress.duration must be a number');
      }
      // Sanity check for reasonable values
      if (body.progress.current < 0 || body.progress.current > 86400) {
        errors.push('progress.current must be between 0 and 86400 seconds');
      }
      if (body.progress.duration < 0 || body.progress.duration > 86400) {
        errors.push('progress.duration must be between 0 and 86400 seconds');
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Sanitize string input (trim and limit length)
const sanitizeString = (str, maxLength) => {
  if (!str || typeof str !== 'string') return null;
  return str.trim().slice(0, maxLength);
};

// Simple Redis helper using Upstash REST API
const redis = {
  async get(key) {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (!url || !token) return null;
    
    try {
      const response = await fetch(`${url}/get/${key}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      return data.result ? JSON.parse(data.result) : null;
    } catch (e) {
      console.error('Redis GET error:', e);
      return null;
    }
  },
  
  async set(key, value, ttlSeconds = 300) {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (!url || !token) return false;
    
    try {
      const response = await fetch(`${url}/set/${key}/${encodeURIComponent(JSON.stringify(value))}/ex/${ttlSeconds}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.ok;
    } catch (e) {
      console.error('Redis SET error:', e);
      return false;
    }
  }
};

export default async function handler(req, res) {
  // ALWAYS set CORS headers FIRST, before any other code
  setCorsHeaders(req, res);

  // Handle preflight immediately - don't process anything else
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    // Rate limiting - use IP or API key as identifier
    const identifier = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                       req.headers['x-real-ip'] || 
                       'unknown';
    
    const rateCheck = await rateLimiter.check(redis, identifier, 60, 60); // 60 requests per minute
    if (!rateCheck.allowed) {
      return res.status(429).json({ 
        error: 'Too many requests', 
        message: `Rate limit exceeded (${rateCheck.count}/${rateCheck.limit} per minute)`,
        retryAfter: 60 
      });
    }

    // GET - Return current watching data
    if (req.method === 'GET') {
      const data = await redis.get('now-watching');
      
      if (data) {
        return res.status(200).json(data);
      }
      
      // Fallback to default
      return res.status(200).json({
        isWatching: false,
        timestamp: new Date().toISOString(),
        title: null,
        episode: null,
        progress: null
      });
    }

    // POST - Update watching data
    if (req.method === 'POST') {
      const apiKey = req.headers['authorization']?.replace('Bearer ', '');
      const expectedKey = process.env.FOXCLI_API_KEY;
      
      // Verify API key if configured
      if (expectedKey && apiKey !== expectedKey) {
        return res.status(401).json({ error: 'Invalid or missing API key' });
      }

      const body = req.body;
      
      // Validate input with length checks
      if (!body) {
        return res.status(400).json({ error: 'Request body is required' });
      }
      
      const validation = validateInput(body);
      if (!validation.valid) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validation.errors 
        });
      }

      // Sanitize and build data object
      const data = {
        isWatching: body.isWatching,
        timestamp: new Date().toISOString(),
        title: sanitizeString(body.title, 200),
        episode: sanitizeString(body.episode, 100),
        season: sanitizeString(body.season, 50),
        progress: body.progress ? {
          current: Math.max(0, Math.min(86400, body.progress.current || 0)),
          duration: Math.max(0, Math.min(86400, body.progress.duration || 0))
        } : null,
        source: sanitizeString(body.source, 50) || 'cloud'
      };

      // Store in Redis (expires after 5 minutes)
      const saved = await redis.set('now-watching', data, 300);
      
      console.log('Data saved:', { title: data.title, isWatching: data.isWatching, saved });

      return res.status(200).json({ 
        success: true, 
        message: saved ? 'Updated and stored' : 'Updated (no storage configured)',
        data 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('Unhandled error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
