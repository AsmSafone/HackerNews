import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { SearchBarProps } from './types';

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [placeholder, setPlaceholder] = useState('');
  const fullPlaceholder = 'Hack the search...';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullPlaceholder.length) {
        setPlaceholder(fullPlaceholder.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full matrix-bg p-3 rounded">
      <div className="flex items-center gap-2">
        <Terminal className="h-5 w-5" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="terminal-input w-full text-xl"
        />
      </div>
    </div>
  );
};