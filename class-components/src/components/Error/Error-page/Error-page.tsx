import React from 'react';
import type { ReactNode } from 'react';

import styles from './Error-page.module.css';

export class ErrorPage extends React.Component {
  reloadApp(): void {
    window.location.reload();
  }

  render(): ReactNode {
    return (
      <div className={styles.page}>
        <h1 className={styles.heading}>Something went wrong</h1>
        <button className={styles.reloadBtn} onClick={() => this.reloadApp()} type="button">
          Reset
        </button>
      </div>
    );
  }
}
