import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

export const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-xl transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer ${className}`}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun size={18} className="text-amber-500" />
      ) : (
        <Moon size={18} className="text-neutral-600" />
      )}
    </button>
  );
};
