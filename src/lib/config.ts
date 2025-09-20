// User configuration - customize these values for your profile
export const USER_CONFIG = {
  name: process.env.NEXT_PUBLIC_USER_NAME || 'John Doe',
  username: process.env.NEXT_PUBLIC_USER_USERNAME || '@johndoe',
  title: process.env.NEXT_PUBLIC_USER_TITLE || 'Developer & Designer',
  bio: process.env.NEXT_PUBLIC_USER_BIO || 'Welcome to my digital hub! Connect with me across platforms and discover my latest projects.',
  avatar: process.env.NEXT_PUBLIC_USER_AVATAR || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
};

// Social links configuration
export const SOCIAL_LINKS = [
  { name: 'Twitter', url: process.env.NEXT_PUBLIC_TWITTER_URL || '#', key: 'twitter', icon: '🐦' },
  { name: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#', key: 'instagram', icon: '📷' },
  { name: 'GitHub', url: process.env.NEXT_PUBLIC_GITHUB_URL || '#', key: 'github', icon: '💻' },
  { name: 'LinkedIn', url: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#', key: 'linkedin', icon: '💼' },
];