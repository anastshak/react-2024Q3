import type { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxStore';
import { clearSelectedCards } from '../../store/selectedCharactersSlice';
import classnames from 'classnames';
import { useTheme } from '../../context/useTheme';

import styles from './Flyout.module.css';

export default function FlyoutElement(): JSX.Element {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector((state) => state.selected.selectedCharacters);

  const handleUnselect = () => {
    dispatch(clearSelectedCards());
  };

  return (
    <div className={classnames(styles.flyout, { [styles.dark]: theme === 'light' })}>
      <p className={styles.info}> {selectedCharacters.length} cards are selected: </p>
      <p className={styles.control}>
        <button type="button" className={styles.btnDownload}>
          Download
        </button>
        <button type="button" className={styles.btnUnselect} onClick={handleUnselect}>
          Unselect all
        </button>
      </p>
    </div>
  );
}
