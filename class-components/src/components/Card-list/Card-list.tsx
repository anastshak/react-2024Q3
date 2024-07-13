import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import Card, { Character } from '../Card/Card';
import { fetchData } from '../../services/api';
import Loader from '../Loader/Loader';

import style from './Card-list.module.css';

export default function CardList(): JSX.Element {
  const arr: Character[] = [];
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState(arr);

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
        <main className={style.cardList}>
          {cards.map((card: Character) => (
            <Card key={card.name} card={card} />
          ))}
        </main>
      )}
    </>
  );
}
