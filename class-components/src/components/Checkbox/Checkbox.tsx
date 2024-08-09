'use client';

import type { JSX } from 'react';
import { Character } from '../../types/types';
import { idFromUrl } from '../../utils/utils';

import style from './Checkbox.module.css';

type Props = {
  card: Character;
  selectCard: () => void;
  isSelected: boolean;
};

export default function Checkbox({ card, selectCard, isSelected }: Props): JSX.Element {
  const id = idFromUrl(card.url);

  return (
    <div className={style.checkboxWrapper}>
      <div className={style.round} onChange={selectCard}>
        <input type="checkbox" id={`checkbox-${id}`} checked={isSelected} readOnly />
        <label htmlFor={`checkbox-${id}`}></label>
      </div>
    </div>
  );
}
