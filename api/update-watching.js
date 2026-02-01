// Vercel serverless function to receive watching updates

// CORS headers helper - must be applied to ALL responses
const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
  return res;
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
  setCorsHeaders(res);

  // Handle preflight immediately - don't process anything else
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
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
      
      // Validate required fields
      if (!body || typeof body.isWatching !== 'boolean') {
        return res.status(400).json({ error: 'Invalid data: isWatching boolean required' });
      }

      const data = {
        isWatching: body.isWatching,
        timestamp: new Date().toISOString(),
        title: body.title || null,
        episode: body.episode || null,
        season: body.season || null,
        progress: body.progress || null,
        source: body.source || 'cloud'
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
