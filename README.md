# Linktree with Redis Backend

A modern, sleek linktree website with click tracking powered by Redis.

## Features

- 🎨 Modern orange-themed UI with light/dark mode
- 📊 Real-time click tracking with Redis backend
- 🔗 Social media links with icons
- 📱 Responsive design
- ⚡ Fast Next.js frontend
- 🔄 Automatic fallbacks to localStorage

## Setup

### Frontend (Next.js)

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your API URL:
```
NEXT_PUBLIC_API_URL=https://your-api-server-url
```

4. Run development server:
```bash
npm run dev
```

### Backend (Express + Redis)

See `api-server/README.md` for detailed setup instructions.

## Redis Setup

### Option 1: Upstash (Recommended)

1. Go to [Upstash](https://upstash.com)
2. Create a Redis database
3. Copy the Redis URL
4. Set `REDIS_URL` environment variable in your API server

### Option 2: Local Redis

1. Install Redis locally
2. Start Redis server
3. Use default `REDIS_URL=redis://localhost:6379`

## API Endpoints

- `GET /api/clicks` - Get click counts
- `POST /api/clicks` - Record a click

## Deployment

### Frontend
Deploy to Vercel, Netlify, or GitHub Pages.

### Backend
Deploy API server to Heroku, Railway, Render, or any Node.js hosting.

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-api-server-url
```

### Backend
```
REDIS_URL=redis://username:password@host:port
PORT=3001
```

## Development

```bash
# Frontend
npm run dev

# Backend
cd api-server && npm run dev
```
