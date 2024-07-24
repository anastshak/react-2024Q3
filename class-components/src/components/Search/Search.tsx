import type { JSX } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';

import styles from './Search.module.css';

type Props = {
  onSearch: (query: string, page: number) => void;
};

export default function Search({ onSearch }: Props): JSX.Element {
  const [inputValue, setInputValue] = useLocalStorage('searchValue');

  const { theme } = useTheme();

  const searchCharacter = async () => {
    localStorage.setItem('searchValue', inputValue);
    onSearch(inputValue, 1);
  };

  return (
    <>
      <div className={classnames(styles.search, { [styles.dark]: theme === 'light' })}>
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
