const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 3002;

// In-memory fallback storage
const memoryStore = new Map();

// Redis client setup
let redisClient;
let useRedis = false;

try {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });

  redisClient.on('error', (err) => {
    console.error('Redis Client Error, falling back to memory:', err.message);
    useRedis = false;
  });

  redisClient.connect().then(() => {
    useRedis = true;
    console.log('Connected to Redis');
  }).catch(() => {
    useRedis = false;
    console.log('Using in-memory storage');
  });
} catch (error) {
  console.log('Redis not available, using in-memory storage');
  useRedis = false;
}

app.use(cors());
app.use(express.json());

// Get click counts
app.get('/api/clicks', async (req, res) => {
  try {
    const { link } = req.query;

    if (useRedis && redisClient) {
      if (link) {
        const count = await redisClient.get(`clicks:${link}`) || '0';
        res.json({ [link]: parseInt(count) });
      } else {
        // Get all click counts
        const keys = await redisClient.keys('clicks:*');
        const counts = {};

        for (const key of keys) {
          const linkName = key.replace('clicks:', '');
          const count = await redisClient.get(key) || '0';
          counts[linkName] = parseInt(count);
        }

        res.json(counts);
      }
    } else {
      // Use in-memory storage
      if (link) {
        const count = memoryStore.get(`clicks:${link}`) || 0;
        res.json({ [link]: count });
      } else {
        const counts = {};
        for (const [key, value] of memoryStore.entries()) {
          if (key.startsWith('clicks:')) {
            const linkName = key.replace('clicks:', '');
            counts[linkName] = value;
          }
        }
        res.json(counts);
      }
    }
  } catch (error) {
    console.error('Error fetching clicks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Record a click
app.post('/api/clicks', async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({ error: 'Link parameter required' });
    }

    if (useRedis && redisClient) {
      const key = `clicks:${link}`;
      const newCount = await redisClient.incr(key);

      res.json({
        [link]: newCount,
        message: 'Click recorded'
      });
    } else {
      // Use in-memory storage
      const key = `clicks:${link}`;
      const currentCount = memoryStore.get(key) || 0;
      const newCount = currentCount + 1;
      memoryStore.set(key, newCount);

      res.json({
        [link]: newCount,
        message: 'Click recorded'
      });
    }
  } catch (error) {
    console.error('Error recording click:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Using ${useRedis ? 'Redis' : 'in-memory'} storage`);
});