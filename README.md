# Linktree with Redis Backend

A modern, sleek linktree website with persistent click tracking powered by Redis. Built with Next.js and featuring a beautiful orange-themed UI.

## Features

- **Modern UI**: Beautiful orange gradient theme with light/dark mode toggle
- **Persistent Analytics**: Redis-powered click tracking across all devices
- **Social Links**: Pre-configured social media links with icons
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Fast Performance**: Next.js with static generation for optimal speed
- **Smart Fallbacks**: Automatically falls back to localStorage if API unavailable
- **Real-time Updates**: Live click count updates with visual feedback

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Redis (local or cloud)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/gioguarin/linktree-orange.git
cd linktree-orange
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Set up environment**
```bash
cp .env.example .env.local
# Edit .env.local with your API URL
```

4. **Start development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your linktree!

## 🗄️ Backend Setup

### Redis Configuration

#### Option 1: Upstash (Recommended)
1. Visit [Upstash](https://upstash.com)
2. Create a free Redis database
3. Copy the Redis URL
4. Set environment variable: `REDIS_URL=your-upstash-url`

#### Option 2: Local Redis
```bash
# Install Redis
brew install redis  # macOS
# or
sudo apt install redis-server  # Ubuntu

# Start Redis
redis-server
```

### API Server

1. **Navigate to API directory**
```bash
cd api-server
```

2. **Install dependencies**
```bash
npm install
```

3. **Set environment variables**
```bash
export REDIS_URL="redis://localhost:6379"  # or your Upstash URL
export PORT=3001
```

4. **Start the server**
```bash
npm run dev  # Development with auto-reload
# or
npm start    # Production
```

## API Reference

### Endpoints

#### GET `/api/clicks`
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

#### POST `/api/clicks`
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

## Configuration

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Backend
```env
REDIS_URL=redis://username:password@host:port
PORT=3001
```

## Deployment

### Frontend (GitHub Pages)
The frontend automatically deploys to GitHub Pages via GitHub Actions when you push to the `master` branch.

**Live URL:** https://gioguarin.github.io/linktree-orange

### Backend Options

#### Railway (Recommended)
1. Connect your GitHub repo to Railway
2. Set environment variables
3. Deploy automatically

#### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set REDIS_URL=your-redis-url
git push heroku master
```

#### Other Platforms
- **Render**: Connect GitHub repo, set env vars
- **Vercel**: For serverless deployment
- **DigitalOcean**: App Platform

## Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Backend
cd api-server
npm run dev          # Development with nodemon
npm start            # Production server
```

### Project Structure

```
linktree-orange/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       └── Linktree.tsx
├── api-server/
│   ├── server.js
│   ├── package.json
│   └── README.md
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

## Customization

### Changing Colors
Edit `src/app/globals.css` to modify the orange theme:
```css
:root {
  --primary-orange: #FFA500;
  --secondary-orange: #FF8C00;
}
```

### Adding Links
Update the `links` array in `src/components/Linktree.tsx`:
```typescript
const links = [
  { name: 'Twitter', url: '#', key: 'twitter', icon: '🐦' },
  // Add more links...
];
```

### Profile Information
Edit the profile section in `src/components/Linktree.tsx`:
```typescript
<h1>John Doe</h1>
<p>Welcome to my linktree!</p>
```

## Analytics

Click data is stored in Redis with keys like `clicks:twitter`, `clicks:instagram`, etc. You can:

- View real-time counts on the website
- Access raw data via API
- Export data for analysis
- Set up monitoring/alerts

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Upstash](https://upstash.com/) - Redis as a service
- [Express.js](https://expressjs.com/) - Web framework

## Support

If you have questions or need help:

- Open an issue on GitHub
- Check the [PROJECTPLAN.md](PROJECTPLAN.md) for roadmap
- Review the API server [README](api-server/README.md)
