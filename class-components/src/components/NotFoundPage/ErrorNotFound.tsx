'use client';

import type { JSX } from 'react';
import Link from 'next/link';

import style from './ErrorNotFound.module.css';

export function ErrorNotFoundPage(): JSX.Element {
  return (
    <div className={style.page}>
      <h2 className={style.heading}>Page Not Found</h2>
      <Link href="/">Go home</Link>
    </div>
  );
}
