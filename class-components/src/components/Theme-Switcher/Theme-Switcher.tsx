'use client';

import { JSX } from 'react';
import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';

import style from './Theme-Switcher.module.css';

export default function ThemeSwitcher(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  const onToggle = () => {
    toggleTheme();
  };

  return (
    <div className={classnames(style.switcher, { [style.dark]: theme === 'light' })}>
      <button onClick={onToggle} className={style.btn}>
        Change Theme
      </button>
    </div>
  );
}
