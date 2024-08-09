'use client';

import type { JSX } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './Search.module.css';

export default function Search(): JSX.Element {
  const [inputValue, setInputValue] = useLocalStorage('searchValue');

  const { theme } = useTheme();

  const router = useRouter();
  const searchParams = useSearchParams();

  const details = searchParams.get('details') || '';

  const onSearch = (search: string, page: string = '1') => {
    const params = new URLSearchParams({ page: page, search: search, details: details || '' });
    router.push(`/?${params}`);
  };

  const searchCharacter = async () => {
    localStorage.setItem('searchValue', inputValue);
    onSearch(inputValue, '1');
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
