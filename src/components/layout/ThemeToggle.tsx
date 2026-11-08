'use client';

import React, { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';

function subscribeToTheme(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('portfolio-theme-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('portfolio-theme-change', callback);
  };
}

function getThemeSnapshot(): 'dark' | 'light' {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function getServerThemeSnapshot(): 'dark' {
  return 'dark';
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
    document.documentElement.setAttribute('data-theme', next);
    if (next === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    window.dispatchEvent(new Event('portfolio-theme-change'));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/40 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-violet-600 hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
