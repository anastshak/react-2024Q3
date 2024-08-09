'use client';

import type { JSX } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

import style from './Search.module.css';

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
      <div className={classnames(style.search, { [style.dark]: theme === 'light' })}>
        <input
          type="text"
          className={style.input}
          placeholder="Please, enter your request"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button type="button" className={style.btn} onClick={searchCharacter}>
          Search
        </button>
      </div>
    </>
  );
}
