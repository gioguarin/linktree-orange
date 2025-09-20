'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { showToast } from './Toast';
import { SkeletonProfile, SkeletonLink } from './Skeleton';
import { USER_CONFIG, SOCIAL_LINKS } from '@/lib/config';

export default function Linktree() {
  const [theme, setTheme] = useState('light');
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isClicking, setIsClicking] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Fetch click counts from API
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

    fetch(`${API_BASE}/api/clicks`)
      .then(res => res.json())
      .then(data => {
        setClickCounts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch click counts:', err);
        // Fallback to localStorage when API is unavailable
        const savedCounts: Record<string, number> = {};
        SOCIAL_LINKS.forEach(link => {
          const count = parseInt(localStorage.getItem(link.key) || '0');
          savedCounts[link.key] = count;
        });
        setClickCounts(savedCounts);
        setIsLoading(false);
      });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLinkClick = async (key: string) => {
    setIsClicking(key);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

    try {
      const response = await fetch(`${API_BASE}/api/clicks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: key }),
      });

      if (response.ok) {
        const data = await response.json();
        setClickCounts(prev => ({ ...prev, [key]: data[key] }));
        showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} clicked ${data[key]} times!`, 'success');
      } else {
        console.error('Failed to record click');
        // Fallback to local increment when API is unavailable
        const newCount = (clickCounts[key] || 0) + 1;
        setClickCounts(prev => ({ ...prev, [key]: newCount }));
        showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} clicked ${newCount} times (offline)`, 'warning');
      }
      setIsClicking(null);
    } catch (error) {
      console.error('Error recording click:', error);
      // Fallback to local increment when API fails
      const newCount = (clickCounts[key] || 0) + 1;
      setClickCounts(prev => ({ ...prev, [key]: newCount }));
      showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} clicked ${newCount} times (offline)`, 'warning');
    }
    setIsClicking(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-100 dark:from-orange-900 dark:via-orange-800 dark:to-red-900 transition-all duration-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 via-pink-200/30 to-purple-200/30 dark:from-orange-800/30 dark:via-pink-800/30 dark:to-purple-800/30 animate-pulse"></div>
      <div className="relative max-w-sm sm:max-w-md md:max-w-lg w-full bg-white/90 dark:bg-orange-950/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-orange-200 dark:border-orange-800 animate-in zoom-in-95 duration-700 hover:shadow-3xl transition-shadow duration-500">
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg font-semibold text-sm sm:text-base touch-manipulation"
        >
          <span className="hidden sm:inline">{theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
          <span className="sm:hidden">{theme === 'light' ? '🌙' : '☀️'}</span>
        </button>

        {isLoading ? <SkeletonProfile /> : (
          <div className="text-center mb-8 sm:mb-12 animate-in fade-in-50 duration-1000">
            <div className="relative mb-6 sm:mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <Image
                  src={USER_CONFIG.avatar}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto border-4 border-white dark:border-orange-950 shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-4 border-white dark:border-orange-950 flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl border-2 border-white dark:border-orange-950">
                <span className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Live</span>
                </span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 dark:from-orange-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight px-2">
                {USER_CONFIG.name}
              </h1>
              <div className="flex items-center justify-center space-x-2 text-orange-600 dark:text-orange-400">
                <span className="text-xs sm:text-sm font-medium">{USER_CONFIG.username}</span>
                <span className="text-xs">•</span>
                <span className="text-xs sm:text-sm">{USER_CONFIG.title}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-xs sm:max-w-sm mx-auto font-medium px-2">
                {USER_CONFIG.bio}
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/50 dark:to-pink-900/50 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-orange-200 dark:border-orange-800">
                <span className="text-orange-800 dark:text-orange-200 font-bold text-base sm:text-lg">
                  {Object.values(clickCounts).reduce((a, b) => a + b, 0).toLocaleString()}
                </span>
                <span className="text-orange-600 dark:text-orange-400 text-xs sm:text-sm ml-1 sm:ml-2">Total Clicks</span>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-blue-200 dark:border-blue-800">
                <span className="text-blue-800 dark:text-blue-200 font-bold text-base sm:text-lg">4</span>
                <span className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm ml-1 sm:ml-2">Links</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 sm:space-y-5">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                <SkeletonLink />
              </div>
            ))
          ) : (
            SOCIAL_LINKS.map((link, index) => (
              <div key={link.key} className="relative group animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                <a
                  href={link.url}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.key);
                  }}
                  className={`block w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 hover:from-orange-500 hover:via-pink-600 hover:to-purple-700 dark:from-orange-600 dark:via-pink-700 dark:to-purple-800 dark:hover:from-orange-700 dark:hover:via-pink-800 dark:hover:to-purple-900 text-white font-bold py-4 px-6 sm:py-6 sm:px-8 rounded-2xl sm:rounded-3xl text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 shadow-xl border-2 border-white/20 dark:border-white/10 group-hover:border-white/40 relative overflow-hidden touch-manipulation active:scale-95 ${isClicking === link.key ? 'animate-pulse scale-95' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center space-x-3 sm:space-x-4">
                    <span className="text-2xl sm:text-3xl group-hover:animate-bounce transition-transform duration-300">{link.icon}</span>
                    <span className="text-lg sm:text-xl tracking-wide">{link.name}</span>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm">→</span>
                    </div>
                  </div>
                </a>

                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs sm:text-sm font-bold px-2 py-1 sm:px-3 sm:py-2 rounded-full shadow-xl border-2 border-white dark:border-orange-950 transform transition-all duration-300 hover:scale-110 animate-pulse">
                  <span className="flex items-center space-x-1">
                    <span className="hidden sm:inline">👆</span>
                    <span>{(clickCounts[link.key] || 0).toLocaleString()}</span>
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-pink-500/20 to-purple-600/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}