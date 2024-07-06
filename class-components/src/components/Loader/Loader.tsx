import React from 'react';
import type { ReactNode } from 'react';
import styles from './Loader.module.css';

export default class Loader extends React.Component {
  render(): ReactNode {
    return (
      <div className={styles.loader}>
        <div className={styles.loaderSpinner}></div>
      </div>
    );
  }
}
