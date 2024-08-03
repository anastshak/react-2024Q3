import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, searchQuery);
    }
  }, [searchQuery, key]);

  return [searchQuery, setSearchQuery];
}
