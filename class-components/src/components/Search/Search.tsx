import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import styles from './Search.module.css';

export default function Search(): JSX.Element {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedQuery = localStorage.getItem('searchValue') || '';
    setInputValue(storedQuery);
  }, []);

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
