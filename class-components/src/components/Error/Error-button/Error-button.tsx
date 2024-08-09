'use client';

import { useState } from 'react';
import type { JSX } from 'react';

import styles from './Error-button.module.css';

export function ErrorButton(): JSX.Element {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('it is broken :(');
  }

  const handleThrowError = () => {
    setThrowError(true);
  };

  return (
    <button className={styles.errorBtn} onClick={handleThrowError} type="button">
      throw error
    </button>
  );
}
