import type { JSX } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import Search from '../../components/Search/Search';
import { ErrorButton } from '../../components/Error/Error-button/Error-button';
import CardList from '../../components/Card-list/Card-list';
import { Character } from '../../types/types';
import { fetchData } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import CardDetails from '../../components/Card-Details/Card-Details';

import style from './Home.module.css';

export default function HomePage(): JSX.Element {
  const [cards, setCards] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [cardId, setCardId] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = useCallback(
    async (searchQuery: string, page: number = 1) => {
      setPage(page);
      setSearchParams({ search: searchQuery, page: page.toString(), details: cardId || '' });
      try {
        setIsLoading(true);
        const data = await fetchData(searchQuery, page);
        setCards(data.cards);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [setSearchParams, cardId]
  );

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    const currPage = parseInt(searchParams.get('page') || '1', 10);
    const cardDetailsId = searchParams.get('details');

    if (page > 0) {
      setPage(currPage);
      onSearch(searchQuery, currPage);
    }

    if (cardDetailsId) {
      setCardId(cardDetailsId);
    }
  }, [searchParams, onSearch, page]);

  const onChangePage = (pageNumber: number) => {
    setSearchParams({ search: searchParams.get('search') || '', page: pageNumber.toString() });
  };

  const handleCardDetailsClick = (id: string) => {
    setCardId(id);
    setSearchParams({ page: page.toString(), search: searchParams.get('search') || '', details: id });
  };

  const handleCloseDetails = () => {
    setCardId(null);
    setSearchParams({ page: page.toString(), search: searchParams.get('search') || '' });
  };

  return (
    <>
      <header className={style.header}>
        <Search onSearch={onSearch} />
        <ErrorButton />
      </header>
      <Outlet />
      <section className={style.main}>
        {isLoading ? (
          <Loader data-testid="loader" />
        ) : (
          <>
            <section className={style.mainSide}>
              <CardList cards={cards} handleCardClick={handleCardDetailsClick} />
              <Pagination currentPage={page} totalPages={totalPages} changePage={onChangePage} />
            </section>
          </>
        )}
        {cardId && (
          <aside className={style.detailSide}>
            <button type="button" onClick={handleCloseDetails}>
              Close
            </button>
            <CardDetails id={cardId} />
          </aside>
        )}
      </section>
    </>
  );
}
