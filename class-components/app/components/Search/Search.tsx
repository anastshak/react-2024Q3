import type { JSX } from 'react';
import useLocalStorage from '@hooks/useLocalStorage';
import { useSearchParams } from '@remix-run/react';

import { useTheme } from '@context/useTheme';
import classnames from 'classnames';
import styles from './Search.module.css';

export default function Search(): JSX.Element {
  const [inputValue, setInputValue] = useLocalStorage('searchValue');
  const [searchParams, setSearchParams] = useSearchParams();

  const { theme } = useTheme();

  const detailsID = searchParams.get('details');

  const onSearch = (searchQuery: string, pageNumber: number = 1) => {
    setSearchParams({ search: searchQuery, page: pageNumber.toString(), details: detailsID || '' });
  };

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
