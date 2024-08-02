/* import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import Search from '../components/Search/Search';
import { ErrorButton } from '../components/Error/Error-button/Error-button';
import CardList from '../components/Card-list/Card-list';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import CardDetails from '../components/Card-Details/Card-Details';
import ThemeSwitcher from '../components/Theme-Switcher/Theme-Switcher';
import { useTheme } from '../context/useTheme';
import classnames from 'classnames';
import FlyoutElement from '../components/FlyoutElement/Flyout';

import { useAppDispatch, useAppSelector } from '../hooks/useReduxStore';
import { setCharacters, setLoading } from '../store/charactersSlice';
import { useGetCharactersQuery } from '../store/swapiApi';

import style from '../styles/Home.module.css';

export default function HomePage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardId, setCardId] = useState<string | null>(null);

  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector((state) => state.selected.selectedCharacters);

  const searchQuery = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const cardDetailsId = searchParams.get('details');

  const { data, error, isFetching } = useGetCharactersQuery({ searchQuery, page });

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
    if (data) {
      dispatch(setCharacters(data));
    }
    if (cardDetailsId) {
      setCardId(cardDetailsId);
    }
  }, [data, cardDetailsId, isFetching, dispatch]);

  const onSearch = (searchQuery: string, page: number = 1) => {
    setSearchParams({ search: searchQuery, page: page.toString(), details: cardId || '' });
  };

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
      <section className={classnames(style.main, { [style.dark]: theme === 'light' })}>
        {isFetching ? (
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
        <Outlet />
        {cardId && (
          <aside className={style.detailSide}>
            <button type="button" onClick={handleCloseDetails}>
              Close
            </button>
            <CardDetails id={cardId} />
          </aside>
        )}
        {selectedCharacters.length > 0 && <FlyoutElement />}
      </section>
    </>
  );
}
 */

function Home() {
  return <h1>Hello</h1>;
}
export default Home;
