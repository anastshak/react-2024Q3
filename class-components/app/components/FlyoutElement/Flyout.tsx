import type { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxStore';
import { clearSelectedCards } from '../../store/selectedCharactersSlice';
import classnames from 'classnames';
import { useTheme } from '../../context/useTheme';
import { convertToCSV } from '../../utils/utils';

import styles from './Flyout.module.css';

export default function FlyoutElement(): JSX.Element {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector((state) => state.selected.selectedCharacters);

  const numberOfElements: number = selectedCharacters.length;

  const handleUnselect = () => {
    dispatch(clearSelectedCards());
  };

  const handleDownload = () => {
    const csvContent = convertToCSV(selectedCharacters);
    const csvData = new Blob([csvContent], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    return csvURL;
  };

  const downloadCSV = handleDownload();

  return (
    <div className={classnames(styles.flyout, { [styles.dark]: theme === 'light' })}>
      <p className={styles.info}> {numberOfElements} cards are selected: </p>
      <p className={styles.control}>
        <a
          href={downloadCSV}
          download={`${numberOfElements}_cards.csv`}
          className={classnames(styles.btn, styles.btnDownload)}
        >
          Download
        </a>
        <button type="button" className={classnames(styles.btn, styles.btnUnselect)} onClick={handleUnselect}>
          Unselect all
        </button>
      </p>
    </div>
  );
}
