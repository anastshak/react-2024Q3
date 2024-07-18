import type { JSX } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

import styles from './Search.module.css';

type Props = {
  onSearch: (query: string, page: number) => void;
};

export default function Search({ onSearch }: Props): JSX.Element {
  const [inputValue, setInputValue] = useLocalStorage('searchValue');

  const searchCharacter = async () => {
    localStorage.setItem('searchValue', inputValue);
    onSearch(inputValue, 1);
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
