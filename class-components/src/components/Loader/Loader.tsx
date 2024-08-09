// 'use client';

// import type { JSX } from 'react';
// import { useTheme } from '../../context/useTheme';
// import classnames from 'classnames';

import style from './Loader.module.css';

export default function Loader() {
  // const { theme } = useTheme();
  return (
    // <div className={classnames(style.loader, { [style.dark]: theme === 'light' })} data-testid="loader">
    <div className={style.loader} data-testid="loader">
      <div className={style.loaderSpinner}></div>
    </div>
  );
}
