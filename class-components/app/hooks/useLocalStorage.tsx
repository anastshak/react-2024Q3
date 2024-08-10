import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    localStorage.setItem(key, searchQuery);
  }, [searchQuery, key]);

  return [searchQuery, setSearchQuery];
}
