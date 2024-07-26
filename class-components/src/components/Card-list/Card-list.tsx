import type { JSX } from 'react';
import Card from '../Card/Card';
import { Character } from '../../types/types';
import { idFromUrl } from '../../utils/utils';

import style from './Card-list.module.css';

type Props = {
  cards: Character[];
  handleCardClick: (id: string) => void;
};

export default function CardList({ cards, handleCardClick }: Props): JSX.Element {
  if (cards.length === 0) {
    return <h1 className={style.noResult}>No characters found</h1>;
  }

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
