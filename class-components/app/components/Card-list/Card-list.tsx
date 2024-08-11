import { useSearchParams } from '@remix-run/react';
import type { JSX } from 'react';

import Card from '@components/Card/Card';
import { Character } from '../../types/types';
import { idFromUrl } from '@utils/utils';

import style from './Card-list.module.css';

type Props = {
  cards: Character[];
};

export default function CardList({ cards }: Props): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const pageNumber = searchParams.get('page') || '1';

  if (cards.length === 0) {
    return <h1 className={style.noResult}>No characters found</h1>;
  }

  const handleCardClick = (id: string) => {
    setSearchParams({ page: pageNumber, search: searchQuery, details: id });
  };

  return (
    <>
      <main className={style.cardList}>
        {cards.map((card: Character) => (
          <Card key={card.name} card={card} onCardClick={() => handleCardClick(idFromUrl(card.url) || '')} />
        ))}
      </main>
    </>
  );
}
