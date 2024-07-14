import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import Card, { Character } from '../Card/Card';
import { fetchData } from '../../services/api';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

import style from './Card-list.module.css';

export default function CardList(): JSX.Element {
  const arr: Character[] = [];
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState(arr);

  const change = () => {
    setIsLoading(true);
    fetchData(page).then((data) => {
      setCards(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then((data) => {
      setCards(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <main className={style.cardList}>
            {cards.map((card: Character) => (
              <Card key={card.name} card={card} />
            ))}
          </main>
          <Pagination
            prev={() => {
              setPage((old) => Math.min(old - 1, old));
              change();
            }}
            next={() => {
              setPage((old) => old + 1);
              change();
            }}
          />
        </>
      )}
    </>
  );
}
