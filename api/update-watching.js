export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Return current watching data
  if (req.method === 'GET') {
    try {
      // Try to get from KV if available
      let data = null;
      
      if (process.env.VERCEL_KV_REST_API_URL && process.env.VERCEL_KV_REST_API_TOKEN) {
        const { kv } = await import('@vercel/kv');
        data = await kv.get('now-watching');
      }
      
      // Fallback to environment variable or default
      if (!data) {
        data = {
          isWatching: false,
          timestamp: new Date().toISOString(),
          title: null,
          episode: null,
          progress: null
        };
      }
      
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error reading from KV:', error);
      return res.status(500).json({ 
        error: 'Failed to read data',
        isWatching: false,
        timestamp: new Date().toISOString()
      });
    }
  }

  // POST - Update watching data
  if (req.method === 'POST') {
    try {
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

      // Store in KV if available
      if (process.env.VERCEL_KV_REST_API_URL && process.env.VERCEL_KV_REST_API_TOKEN) {
        try {
          const { kv } = await import('@vercel/kv');
          await kv.set('now-watching', data, { ex: 300 }); // Expire after 5 minutes
        } catch (kvError) {
          console.error('KV store error:', kvError);
          // Continue - we'll return the data even if KV fails
        }
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Updated successfully',
        data 
      });
    } catch (error) {
      console.error('Error updating:', error);
      return res.status(500).json({ error: 'Failed to update' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
