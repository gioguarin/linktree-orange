# Linktree API Server

Express server with Redis for handling click tracking.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Redis:
   - For local Redis: Install Redis and start it
   - For Upstash (recommended):
     - Go to https://upstash.com
     - Create a Redis database
     - Copy the Redis URL

3. Set environment variable:
```bash
export REDIS_URL="your-redis-url-here"
```

4. Start the server:
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

## API Endpoints

### GET /api/clicks
Get click counts for all links or a specific link.

Query parameters:
- `link` (optional): Get count for specific link

### POST /api/clicks
Record a click for a link.

Body:
```json
{
  "link": "twitter"
}
```

## Deployment

Deploy to any platform that supports Node.js (Heroku, Railway, Render, etc.).

Set the `REDIS_URL` environment variable in your deployment platform.

## Frontend Integration

Update your frontend's `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-api-server-url
```

The frontend will automatically fall back to localStorage if the API is unavailable.