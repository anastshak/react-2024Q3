'use client';

import type { JSX } from 'react';

import style from './Error-page.module.css';

export function ErrorPage(): JSX.Element {
  const reloadApp = () => {
    window.location.reload();
  };

  return (
    <div className={style.page}>
      <h1 className={style.heading}>Something went wrong</h1>
      <button className={style.reloadBtn} onClick={() => reloadApp()} type="button">
        Reset
      </button>
    </div>
  );
}
