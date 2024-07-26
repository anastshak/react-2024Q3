import type { JSX } from 'react';
import { Character } from '../../types/types';
import { idFromUrl } from '../../utils/utils';

import styles from './Checkbox.module.css';

type Props = {
  card: Character;
  selectCard: (id: string) => void;
};

export default function Checkbox({ card, selectCard }: Props): JSX.Element {
  const idCard = idFromUrl(card.url);
  const checkboxId = `checkbox-${idCard}`;

  return (
    <div className={styles.checkboxWrapper}>
      <div className={styles.round} onClick={() => selectCard(idCard || '')}>
        <input type="checkbox" id={checkboxId} />
        <label htmlFor={checkboxId}></label>
      </div>
    </div>
  );
}
