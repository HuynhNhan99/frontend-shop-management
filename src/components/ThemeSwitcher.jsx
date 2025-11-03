import React, { useEffect, useState } from 'react';
import { lightTheme, darkTheme, applyTheme } from '../theme';

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // Tự động nhận theme hệ thống nếu chưa có localStorage
    return window.matchMedia('(prefers-color-scheme: light)').matches;
  });

  useEffect(() => {
    applyTheme(isDark ? darkTheme : lightTheme);
    document.body.className = isDark ? 'dark' : '';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-[var(--color-card)] text-[var(--color-text)] shadow-md hover:scale-105 transition-all duration-300"
      title={isDark ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}
