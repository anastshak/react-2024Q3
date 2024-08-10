import type { JSX } from 'react';
import { Link } from '@remix-run/react';

import styles from './ErrorNotFound.module.css';

export function ErrorNotFoundPage(): JSX.Element {
  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Page Not Found</h2>
      <Link to="/" reloadDocument>
        Go home
      </Link>
    </div>
  );
}
