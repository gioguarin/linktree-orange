# Linktree API Server

Express.js API server for Linktree Orange with Redis backend support and automatic fallback to in-memory storage.

## Features

- RESTful API for click tracking
- Redis integration with in-memory fallback
- CORS enabled for frontend communication
- Environment-based configuration
- Comprehensive error handling

## Quick Start

### Prerequisites
- Node.js 18+
- Redis (optional - falls back to in-memory storage)

### Installation

```bash
cd api-server
npm install
```

### Configuration

Create a `.env` file in the api-server directory:

```env
# Redis Configuration (optional)
REDIS_URL=redis://localhost:6379

# Server Configuration
PORT=3003
```

### Development

```bash
npm run dev  # With auto-reload using nodemon
```

### Production

```bash
npm start
```

## API Endpoints

### GET /api/clicks
Get click counts for all links or a specific link.

**Query Parameters:**
- `link` (optional): Filter by specific link (e.g., `?link=twitter`)

**Response:**
```json
{
  "twitter": 42,
  "instagram": 28,
  "github": 15
}
```

**Examples:**
```bash
curl http://localhost:3003/api/clicks
curl http://localhost:3003/api/clicks?link=twitter
```

### POST /api/clicks
Record a click for a specific link.

**Request Body:**
```json
{
  "link": "twitter"
}
```

**Response:**
```json
{
  "twitter": 43,
  "message": "Click recorded"
}
```

**Example:**
```bash
curl -X POST http://localhost:3003/api/clicks \
  -H "Content-Type: application/json" \
  -d '{"link": "twitter"}'
```

## Deployment

### Railway (Recommended)
1. Connect your GitHub repo to Railway
2. Set the root directory to `api-server`
3. Add environment variables in Railway dashboard
4. Deploy automatically on push

### Render
1. Create a new Web Service on Render
2. Connect your GitHub repo
3. Set root directory to `api-server`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables

### Heroku
```bash
cd api-server
heroku create your-api-name
heroku config:set REDIS_URL=your-redis-url
git push heroku main
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |
| `PORT` | Server port | `3003` |

## Frontend Integration

Update your frontend's `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-deployed-api-url
```

The frontend will automatically fall back to localStorage if the API is unavailable.

## Architecture

- **Redis**: Primary storage for click counts (persistent)
- **In-memory Map**: Fallback when Redis is unavailable
- **Express.js**: Web framework with CORS enabled
- **Error Handling**: Comprehensive error handling with fallbacks