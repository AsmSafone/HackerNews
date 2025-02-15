import React from 'react';
import { Sun, Moon, Github } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="fixed top-4 right-4 flex gap-2">
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-full matrix-bg"
        aria-label="Toggle theme"
        >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
      <a
        href="https://github.com/AsmSafone/HackerNews"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full matrix-bg"
        aria-label="GitHub repository"
        >
        <Github className="h-5 w-5" />
      </a>
    </div>
  );
};