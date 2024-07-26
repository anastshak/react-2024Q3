import type { JSX } from 'react';
import { Character } from '../../types/types';
import { idFromUrl } from '../../utils/utils';
import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';

import style from './Card.module.css';
import Checkbox from '../Checkbox/Checkbox';

type Props = {
  card: Character;
  onCardClick: (id: string) => void;
};

export default function Card({ card, onCardClick }: Props): JSX.Element {
  const id = idFromUrl(card.url);
  const { theme } = useTheme();

  return (
    <div className={classnames(style.card, { [style.dark]: theme === 'light' })} data-testid="card">
      <div className={style.infoBox} onClick={() => onCardClick(id || '')}>
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
      <div className={style.checkboxBox}>
        <Checkbox card={card} selectCard={() => console.log(id)} />
      </div>
    </div>
  );
}
