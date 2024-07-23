import type { JSX } from 'react';
import styles from './Loader.module.css';

export default function Loader(): JSX.Element {
  return (
    <div className={styles.loader} data-testid="loader">
      <div className={styles.loaderSpinner}></div>
    </div>
  );
}
