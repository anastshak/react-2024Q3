'use client';

import type { JSX } from 'react';
import Card from '../Card/Card';
import { Character } from '../../types/types';
import { idFromUrl } from '../../utils/utils';
import { useRouter, useSearchParams } from 'next/navigation';

import style from './Card-list.module.css';

type Props = {
  cards: Character[];
};

export default function CardList({ cards }: Props): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  if (cards.length === 0) {
    return <h1 className={style.noResult}>No characters found</h1>;
  }

  const handleCardClick = (id: string) => {
    const params = new URLSearchParams({ page: page.toString(), search: searchQuery, details: id });
    router.push(`/?${params}`);
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
