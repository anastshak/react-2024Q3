'use client';

import { useTheme } from './useTheme';
import classnames from 'classnames';
import style from '../app/home/Home.module.css';

interface ThemeContainerProps {
  children: React.ReactNode;
}

export default function ThemeBox({ children }: ThemeContainerProps) {
  const { theme } = useTheme();

  return <main className={classnames({ [style.dark]: theme === 'light' })}>{children}</main>;
}
