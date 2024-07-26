import type { JSX } from 'react';
import { Character } from '../../types/types';
import { idFromUrl } from '../../utils/utils';

import styles from './Checkbox.module.css';

type Props = {
  card: Character;
  selectCard: () => void;
  isSelected: boolean;
};

export default function Checkbox({ card, selectCard, isSelected }: Props): JSX.Element {
  const id = idFromUrl(card.url);

  return (
    <div className={styles.checkboxWrapper}>
      <div className={styles.round} onChange={selectCard}>
        <input type="checkbox" id={`checkbox-${id}`} checked={isSelected} readOnly />
        <label htmlFor={`checkbox-${id}`}></label>
      </div>
    </div>
  );
}
