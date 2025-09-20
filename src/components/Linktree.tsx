'use client';

import { useState, useEffect } from 'react';

const links = [
  { name: 'Twitter', url: '#', key: 'twitter', icon: '🐦' },
  { name: 'Instagram', url: '#', key: 'instagram', icon: '📷' },
  { name: 'GitHub', url: '#', key: 'github', icon: '💻' },
  { name: 'LinkedIn', url: '#', key: 'linkedin', icon: '💼' },
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-100 dark:from-orange-900 dark:via-orange-800 dark:to-red-900 transition-all duration-500">
      <div className="max-w-lg w-full bg-white/90 dark:bg-orange-950/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 relative border border-orange-200 dark:border-orange-800">
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg font-semibold"
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>

        <div className="text-center mb-10">
          <div className="relative mb-6">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-orange-400 dark:border-orange-500 shadow-2xl transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Online
            </div>
          </div>
          <h1 className="text-3xl font-bold text-orange-800 dark:text-orange-200 mb-3 bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-400 dark:to-orange-600 bg-clip-text text-transparent">
            John Doe
          </h1>
          <p className="text-orange-700 dark:text-orange-300 text-lg leading-relaxed max-w-xs mx-auto">
            Welcome to my linktree! Click below to connect and see the click counter in action.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="bg-orange-100 dark:bg-orange-900 px-4 py-2 rounded-full">
              <span className="text-orange-800 dark:text-orange-200 font-semibold">Total Clicks: {Object.values(clickCounts).reduce((a, b) => a + b, 0)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.key} className="relative">
              <a
                href={link.url}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.key);
                }}
                className="block w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 dark:from-orange-600 dark:via-orange-700 dark:to-orange-800 dark:hover:from-orange-700 dark:hover:via-orange-800 dark:hover:to-orange-900 text-white font-semibold py-5 px-6 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl border-2 border-orange-300 dark:border-orange-700 group"
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl group-hover:animate-bounce">{link.icon}</span>
                  <span className="text-lg">{link.name}</span>
                </div>
              </a>
              <div className="absolute -top-2 -right-2 bg-orange-600 dark:bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {clickCounts[link.key] || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}