import { LoaderFunctionArgs } from '@remix-run/node';
import { CharactersPerPage } from '../types/types';
import { useLoaderData } from '@remix-run/react';

import FlyoutElement from '@components/FlyoutElement/Flyout';
import CardList from '@components/Card-list/Card-list';
import Pagination from '@components/Pagination/Pagination';
import CardDetailsWrapper from '@components/Card-Details-Wrapper/Card-Details-Wrapper';
import { CharacterDetails } from '../types/types';

import { useTheme } from '@context/useTheme';
import classnames from 'classnames';
import style from '@styles/Home.module.css';

const BASE_URL = 'https://swapi.dev/api/people/';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const searchQuery = searchParams.get('search') || '';
  const pageNumber = searchParams.get('page') || '1';
  const detailsID = searchParams.get('details') || '';

  const response = await fetch(`${BASE_URL}?search=${searchQuery}&page=${pageNumber}`);
  const data: CharactersPerPage = await response.json();

  let characterDetails: CharacterDetails | null = null;

  if (detailsID) {
    const responseDetails = await fetch(`${BASE_URL}${detailsID}`);
    characterDetails = await responseDetails.json();
  }

  return {
    cards: data.results,
    totalPages: Math.ceil(data.count / 10),
    pageNumber,
    detailsID,
    person: characterDetails,
  };
}

export default function Index() {
  const { cards, totalPages, pageNumber, detailsID, person } = useLoaderData<typeof loader>();
  const { theme } = useTheme();

  return (
    <section className={classnames(style.main, { [style.dark]: theme === 'light' })}>
      {cards && (
        <>
          <section className={style.mainSide}>
            <CardList cards={cards || []} />
            <Pagination currentPage={+pageNumber} totalPages={totalPages || 1} />
          </section>
        </>
      )}
      {detailsID && person && <CardDetailsWrapper details={person} />}
      {<FlyoutElement />}
    </section>
  );
}
