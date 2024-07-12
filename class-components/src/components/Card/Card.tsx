import type { JSX } from 'react';
import style from './Card.module.css';

type Props = {
  card: Character;
};

export type Character = {
  name: string;
  gender: string;
  height: number;
  birth_year: string;
};

export default function Card({ card }: Props): JSX.Element {
  return (
    <div className={style.card}>
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
