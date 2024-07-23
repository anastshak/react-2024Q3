import type { JSX } from 'react';
import { Character } from '../../types/types';

import style from './Card.module.css';
import { idFromUrl } from '../../utils/utils';

type Props = {
  card: Character;
  onCardClick: (id: string) => void;
};

export default function Card({ card, onCardClick }: Props): JSX.Element {
  const id = idFromUrl(card.url);
  return (
    <div className={style.card} onClick={() => onCardClick(id || '')} data-testid="card">
      <div className={style.info}>
        Name: <span>{card.name}</span>
      </div>
      <div className={style.info}>
        Gender: <span>{card.gender}</span>
      </div>
      <div className={style.info}>
        Height: <span>{card.height}</span>
      </div>
      <div className={style.info}>
        Birth year: <span>{card.birth_year}</span>
      </div>
    </div>
  );
}
