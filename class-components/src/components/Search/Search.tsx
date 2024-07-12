import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import styles from './Search.module.css';

function useLocalStorage(key: string): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    localStorage.setItem(key, searchQuery);
  }, [searchQuery, key]);

  return [searchQuery, setSearchQuery];
}

export default function Search(): JSX.Element {
  const [inputValue, setInputValue] = useLocalStorage('searchValue');

  const searchCharacter = async () => {
    localStorage.setItem('searchValue', inputValue);
    window.location.reload();
  };

  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.input}
          placeholder="Please, enter your request"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button type="button" className={styles.btn} onClick={searchCharacter}>
          Search
        </button>
      </div>
    </>
  );
}
