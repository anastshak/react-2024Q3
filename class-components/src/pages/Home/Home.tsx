import type { JSX } from 'react';
import Search from '../../components/Search/Search';
import { ErrorButton } from '../../components/Error/Error-button/Error-button';
import CardList from '../../components/Card-list/Card-list';

import style from './Home.module.css';

export default function HomePage(): JSX.Element {
  return (
    <>
      <header className={style.header}>
        <Search />
        <ErrorButton />
      </header>
      <CardList />
    </>
  );
}
