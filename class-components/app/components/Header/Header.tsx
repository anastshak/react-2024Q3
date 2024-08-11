import type { JSX } from 'react';

import Search from '../../components/Search/Search';
import { ErrorButton } from '../../components/Error/Error-button/Error-button';
import ThemeSwitcher from '../../components/Theme-Switcher/Theme-Switcher';

import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';
import style from './Header.module.css';

export default function Header(): JSX.Element {
  const { theme } = useTheme();

  return (
    <header className={classnames(style.header, { [style.dark]: theme === 'light' })}>
      <Search />
      <ErrorButton />
      <ThemeSwitcher />
    </header>
  );
}
