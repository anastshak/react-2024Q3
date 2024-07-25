import type { JSX } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import Search from '../../components/Search/Search';
import { ErrorButton } from '../../components/Error/Error-button/Error-button';
import CardList from '../../components/Card-list/Card-list';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import CardDetails from '../../components/Card-Details/Card-Details';
import ThemeSwitcher from '../../components/Theme-Switcher/Theme-Switcher';
import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';

import { useAppDispatch } from '../../hooks/useReduxStore';
import { setCharacters, setLoading } from '../../store/charactersSlice';
import { useGetCharactersQuery } from '../../store/swapiApi';

import style from './Home.module.css';

export default function HomePage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardId, setCardId] = useState<string | null>(null);

  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const searchQuery = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const cardDetailsId = searchParams.get('details');

  const { data, error, isLoading } = useGetCharactersQuery({ searchQuery, page });

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (data) {
      dispatch(setCharacters(data));
    }
    if (cardDetailsId) {
      setCardId(cardDetailsId);
    }
  }, [data, cardDetailsId, isLoading, dispatch]);

  const onSearch = useCallback(
    (searchQuery: string, page: number = 1) => {
      setSearchParams({ search: searchQuery, page: page.toString(), details: cardId || '' });
    },
    [setSearchParams, cardId]
  );

  const onChangePage = (pageNumber: number) => {
    setSearchParams({ search: searchQuery, page: pageNumber.toString() });
  };

  const handleCardDetailsClick = (id: string) => {
    setCardId(id);
    setSearchParams({ page: page.toString(), search: searchQuery, details: id });
  };

  const handleCloseDetails = () => {
    setCardId(null);
    setSearchParams({ page: page.toString(), search: searchQuery });
  };

  return (
    <>
      <header className={classnames(style.header, { [style.dark]: theme === 'light' })}>
        <Search onSearch={onSearch} />
        <ErrorButton />
        <ThemeSwitcher />
      </header>
      <Outlet />
      <section className={classnames(style.main, { [style.dark]: theme === 'light' })}>
        {isLoading ? (
          <Loader data-testid="loader" />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <section className={style.mainSide}>
              <CardList cards={data?.cards || []} handleCardClick={handleCardDetailsClick} />
              <Pagination currentPage={page} totalPages={data?.totalPages || 1} changePage={onChangePage} />
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
