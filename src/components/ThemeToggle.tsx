import useTheme from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? 'Tema claro' : 'Tema escuro';

  return (
    <button type="button" className="btn btn-ghost theme-toggle" onClick={toggleTheme}>
      {label}
    </button>
  );
}
