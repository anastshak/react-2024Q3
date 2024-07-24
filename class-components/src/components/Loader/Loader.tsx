import type { JSX } from 'react';
import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';

import styles from './Loader.module.css';

export default function Loader(): JSX.Element {
  const { theme } = useTheme();
  return (
    <div className={classnames(styles.loader, { [styles.dark]: theme === 'light' })} data-testid="loader">
      <div className={styles.loaderSpinner}></div>
    </div>
  );
}
