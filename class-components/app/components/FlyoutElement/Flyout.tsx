import type { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxStore';
import { clearSelectedCards } from '../../store/selectedCharactersSlice';
import classnames from 'classnames';
import { useTheme } from '../../context/useTheme';
import { convertToCSV } from '../../utils/utils';

import style from './Flyout.module.css';

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

  if (selectedCharacters.length > 0) {
    return (
      <div className={classnames(style.flyout, { [style.dark]: theme === 'light' })}>
        <p className={style.info}> {numberOfElements} cards are selected: </p>
        <p className={style.control}>
          <a
            href={downloadCSV}
            download={`${numberOfElements}_cards.csv`}
            className={classnames(style.btn, style.btnDownload)}
          >
            Download
          </a>
          <button type="button" className={classnames(style.btn, style.btnUnselect)} onClick={handleUnselect}>
            Unselect all
          </button>
        </p>
      </div>
    );
  }
  return <></>;
}
