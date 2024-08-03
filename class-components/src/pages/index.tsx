import type { JSX } from 'react';
import { useRouter } from 'next/router';

import Search from '../components/Search/Search';
import { ErrorButton } from '../components/Error/Error-button/Error-button';
import CardList from '../components/Card-list/Card-list';
import Pagination from '../components/Pagination/Pagination';
import CardDetails from '../components/Card-Details/Card-Details';
import ThemeSwitcher from '../components/Theme-Switcher/Theme-Switcher';
import FlyoutElement from '../components/FlyoutElement/Flyout';

import { useAppSelector } from '../hooks/useReduxStore';
import { getRunningQueriesThunk, swapiApi, useGetCharactersQuery } from '../store/swapiApi';
import { wrapper } from '../store/store';
import { checkTypesSearchParams } from '../utils/utils';

import { useTheme } from '../context/useTheme';
import classnames from 'classnames';
import style from '../styles/Home.module.css';

export default function HomePage(): JSX.Element {
  const router = useRouter();
  const { theme } = useTheme();

  const selectedCharacters = useAppSelector((state) => state.selected.selectedCharacters);

  const searchQuery = (router.query.search as string) || '';
  const page = parseInt((router.query.page as string) || '1', 10);
  const cardDetails = router.query.details as string;

  const { data } = useGetCharactersQuery({ searchQuery, page });

  const onSearch = (searchQuery: string, page: number = 1) => {
    router.push({
      pathname: '/',
      query: { page: page.toString(), search: searchQuery, details: cardDetails || '' },
    });
  };

  const onChangePage = (pageNumber: number) => {
    router.push({
      pathname: '/',
      query: { page: pageNumber.toString(), search: searchQuery, details: cardDetails || '' },
    });
  };

  const handleCardDetailsClick = (id: string) => {
    router.push({
      pathname: '/',
      query: { page: page.toString(), search: searchQuery, details: id },
    });
  };

  const handleCloseDetails = () => {
    router.push({
      pathname: '/',
      query: { page: page.toString(), search: searchQuery },
    });
  };

  return (
    <>
      <header className={classnames(style.header, { [style.dark]: theme === 'light' })}>
        <Search onSearch={onSearch} />
        <ErrorButton />
        <ThemeSwitcher />
      </header>
      <section className={classnames(style.main, { [style.dark]: theme === 'light' })}>
        {data && (
          <>
            <section className={style.mainSide}>
              <CardList cards={data?.cards || []} handleCardClick={handleCardDetailsClick} />
              <Pagination currentPage={page} totalPages={data?.totalPages || 1} changePage={onChangePage} />
            </section>
          </>
        )}
        {cardDetails && (
          <aside className={style.detailSide}>
            <button type="button" onClick={handleCloseDetails}>
              Close
            </button>
            <CardDetails id={cardDetails} />
          </aside>
        )}
        {selectedCharacters.length > 0 && <FlyoutElement />}
      </section>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { details, page, query } = context.query;

  const { searchDetails, currentPage, searchQuery } = checkTypesSearchParams({ details, page, query });

  await store.dispatch(
    swapiApi.endpoints.getCharacters.initiate({
      searchQuery: searchQuery,
      page: currentPage,
    })
  );

  if (searchDetails) {
    await store.dispatch(swapiApi.endpoints.getCharacterById.initiate(searchDetails));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});
