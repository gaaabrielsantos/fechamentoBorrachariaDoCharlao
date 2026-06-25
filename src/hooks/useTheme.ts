import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';
const STORAGE_KEY = 'fechamento_jobinho_theme';
const DEFAULT_THEME: ThemeMode = 'light';

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return DEFAULT_THEME;
};

const applyThemeClass = (theme: ThemeMode): void => {
  document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  document.documentElement.classList.toggle('light-theme', theme === 'light');
};

export default function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, theme);
    applyThemeClass(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
