import type { JSX } from 'react';
import Link from 'next/link';

import styles from './ErrorNotFound.module.css';

export function ErrorNotFoundPage(): JSX.Element {
  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Page Not Found</h2>
      <Link href="/">Go home</Link>
    </div>
  );
}
