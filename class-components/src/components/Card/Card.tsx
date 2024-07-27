import { JSX } from 'react';
import { Character } from '../../types/types';
import { idFromUrl } from '../../utils/utils';
import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';
import Checkbox from '../Checkbox/Checkbox';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxStore';
import { toggleSelected } from '../../store/selectedCharactersSlice';

import style from './Card.module.css';

type Props = {
  card: Character;
  onCardClick: (id: string) => void;
};

export default function Card({ card, onCardClick }: Props): JSX.Element {
  const id = idFromUrl(card.url) as string;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector((state) => state.selected.selectedCharacters);
  const isSelected = selectedCharacters.some((selectedCard) => selectedCard.url === card.url);

  const handleSelectCard = () => {
    dispatch(toggleSelected({ id, card }));
  };

  return (
    <div
      className={classnames(style.card, { [style.dark]: theme === 'light' })}
      onClick={() => onCardClick(id || '')}
      data-testid="card"
    >
      <div className={style.infoBox}>
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
      <div className={style.checkboxBox} onClick={(e) => e.stopPropagation()}>
        <Checkbox card={card} selectCard={handleSelectCard} isSelected={isSelected} />
      </div>
    </div>
  );
}
