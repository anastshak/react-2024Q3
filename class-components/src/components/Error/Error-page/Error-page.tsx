import type { JSX } from 'react';

import styles from './Error-page.module.css';

export function ErrorPage(): JSX.Element {
  const reloadApp = () => {
    window.location.reload();
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Something went wrong</h1>
      <button className={styles.reloadBtn} onClick={() => reloadApp()} type="button">
        Reset
      </button>
    </div>
  );
}
