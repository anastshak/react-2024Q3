import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Card, { Character } from './components/Card/Card';
import { fetchData } from './services/api';
import { ErrorButton } from './components/Error/Error-button/Error-button';
import Loader from './components/Loader/Loader';

export function App(): JSX.Element {
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
      <header className="header">
        <Search />
        <ErrorButton />
      </header>

      {isLoading ? (
        <Loader />
      ) : (
        <main className="cards">
          {cards.map((card: Character) => (
            <Card key={card.name} card={card} />
          ))}
        </main>
      )}
    </>
  );
}

export default App;
