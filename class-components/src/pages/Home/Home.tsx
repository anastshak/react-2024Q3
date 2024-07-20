import type { JSX } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Search from '../../components/Search/Search';
import { ErrorButton } from '../../components/Error/Error-button/Error-button';
import CardList from '../../components/Card-list/Card-list';
import { Character } from '../../types/types';
import { fetchData } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

import style from './Home.module.css';

export default function HomePage(): JSX.Element {
  const [cards, setCards] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = useCallback(
    async (searchQuery: string, page: number = 1) => {
      setIsLoading(true);
      setPage(page);
      setSearchParams({ search: searchQuery, page: page.toString() });
      try {
        const data = await fetchData(searchQuery, page);
        setCards(data.cards);
        setTotalPages(data.totalPages);
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
    const currPage = parseInt(searchParams.get('page') || '1', 10);
    if (page > 0) {
      setPage(currPage);
      onSearch(searchQuery, currPage);
    }
  }, [searchParams, onSearch, page]);

  const onChangePage = (pageNumber: number) => {
    setSearchParams({ search: searchParams.get('search') || '', page: pageNumber.toString() });
  };

  return (
    <>
      <header className={style.header}>
        <Search onSearch={onSearch} />
        <ErrorButton />
      </header>
      {isLoading ? (
        <Loader data-testid="loader" />
      ) : (
        <>
          <section>
            <CardList cards={cards} />
            <Pagination currentPage={page} totalPages={totalPages} changePage={onChangePage} />
          </section>
        </>
      )}
    </>
  );
}
