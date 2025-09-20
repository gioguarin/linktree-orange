const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 3001;

// Redis client setup
// For Upstash: REDIS_URL=redis://username:password@host:port
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect();

app.use(cors());
app.use(express.json());

// Get click counts
app.get('/api/clicks', async (req, res) => {
  try {
    const { link } = req.query;

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

    const key = `clicks:${link}`;
    const newCount = await redisClient.incr(key);

    res.json({
      [link]: newCount,
      message: 'Click recorded'
    });
  } catch (error) {
    console.error('Error recording click:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});