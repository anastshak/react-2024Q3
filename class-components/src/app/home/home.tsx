import Search from '../../components/Search/Search';
import { ErrorButton } from '../../components/Error/Error-button/Error-button';
import CardList from '../../components/Card-list/Card-list';
import Pagination from '../../components/Pagination/Pagination';
import ThemeSwitcher from '../../components/Theme-Switcher/Theme-Switcher';
import FlyoutElement from '../../components/FlyoutElement/Flyout';
import Details from '../details/details';
import { DataFetch } from '../../types/types';
import ThemeBox from '../../context/ThemeBox';

import style from './Home.module.css';

const BASE_URL = 'https://swapi.dev/api/people/';

async function fetchData(searchQuery: string = '', page: string = '1'): Promise<DataFetch> {
  return fetch(`${BASE_URL}?search=${searchQuery}&page=${page}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => ({
      cards: data.results,
      totalPages: Math.ceil(data.count / 10),
    }))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<JSX.Element> {
  const { details, page, search } = searchParams;

  const data = await fetchData(search, page);

  return (
    <>
      <ThemeBox>
        <header className={style.header}>
          <Search />
          <ErrorButton />
          <ThemeSwitcher />
        </header>
        <section className={style.main}>
          {data && (
            <>
              <section className={style.mainSide}>
                <CardList cards={data?.cards || []} />
                <Pagination currentPage={+page || 1} totalPages={data?.totalPages || 1} />
              </section>
            </>
          )}
          {Boolean(details) && <Details />}
          <FlyoutElement />
        </section>
      </ThemeBox>
    </>
  );
}
