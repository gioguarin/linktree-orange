'use client';

import { useState, useEffect } from 'react';

const links = [
  { name: 'Twitter', url: '#', key: 'twitter' },
  { name: 'Instagram', url: '#', key: 'instagram' },
  { name: 'GitHub', url: '#', key: 'github' },
  { name: 'LinkedIn', url: '#', key: 'linkedin' },
];

export default function Linktree() {
  const [theme, setTheme] = useState('light');
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedCounts: Record<string, number> = {};
    links.forEach(link => {
      const count = parseInt(localStorage.getItem(link.key) || '0');
      savedCounts[link.key] = count;
    });
    setClickCounts(savedCounts);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLinkClick = (key: string) => {
    const newCount = (clickCounts[key] || 0) + 1;
    setClickCounts(prev => ({ ...prev, [key]: newCount }));
    localStorage.setItem(key, newCount.toString());
    alert(`${key} clicked ${newCount} times`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-200 to-orange-100 dark:from-orange-900 dark:to-orange-800 transition-colors">
      <div className="max-w-md w-full bg-white/80 dark:bg-orange-950/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-4 py-2 rounded-full transition-colors"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="text-center mb-8">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-500"
          />
          <h1 className="text-2xl font-bold text-orange-800 dark:text-orange-200 mb-2">John Doe</h1>
          <p className="text-orange-700 dark:text-orange-300">Welcome to my linktree! Click below to connect.</p>
        </div>

        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.url}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.key);
              }}
              className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 text-white font-semibold py-4 px-6 rounded-xl text-center transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}