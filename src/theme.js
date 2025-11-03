// src/theme.js
export const lightTheme = {
  '--color-bg': '#ECFDF5',
  '--color-card': '#FFFFFF',
  '--color-text': '#064E3B',
  '--color-primary': '#10B981',
  '--color-primary-dark': '#059669',
  '--color-accent': '#F59E0B',
  '--color-accent-dark': '#eb9605',
  '--color-success': '#22C55E',
  '--color-danger': '#EF4444',
  '--color-border': '#A7F3D0',
};

export const darkTheme = {
  '--color-bg': '#0F172A',
  '--color-card': '#1E293B',
  '--color-text': '#F1F5F9',
  '--color-primary': '#10B981',
  '--color-primary-dark': '#059669',
  '--color-accent': '#FBBF24',
  '--color-success': '#4ADE80',
  '--color-danger': '#F87171',
  '--color-border': '#475569',
};

export const applyTheme = (theme) => {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
