import { ReactNode, useCallback, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import { ErrorButton } from '../../components/Error/Error-button/Error-button';
import CardList from '../../components/Card-list/Card-list';
import { Character } from '../../types/types';
import { fetchData } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';

import style from './Home.module.css';

export default function HomePage(): ReactNode {
  const arr: Character[] = [];
  const [cards, setCards] = useState(arr);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = useCallback(
    async (searchQuery: string, page: number = 1) => {
      setIsLoading(true);
      setSearchParams({ search: searchQuery, page: page.toString() });
      try {
        const data = await fetchData(searchQuery, page);
        setCards(data.cards);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [setSearchParams]
  );

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    onSearch(searchQuery, 1);
  }, [searchParams, onSearch]);

  return (
    <>
      <header className={style.header}>
        <Search onSearch={onSearch} />
        <ErrorButton />
      </header>
      {isLoading ? <Loader /> : <CardList cards={cards} />}
    </>
  );
}
