import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: 'export' to enable server mode and Image optimization
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
