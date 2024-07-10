import React from 'react';
import type { ReactNode } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Card, { Character } from './components/Card/Card';
import { fetchData } from './services/api';
import { ErrorButton } from './components/Error/Error-button/Error-button';
import Loader from './components/Loader/Loader';

class App extends React.Component {
  state = {
    cards: [],
    loading: true,
  };

  componentDidMount(): void {
    this.setState({ loading: true });
    fetchData().then((data) => this.setState({ cards: data, loading: false }));
  }

  render(): ReactNode {
    return (
      <>
        <header className="header">
          <Search />
          <ErrorButton />
        </header>

        {this.state.loading ? (
          <Loader />
        ) : (
          <main className="cards">
            {this.state.cards.map((card: Character) => (
              <Card key={card.name} card={card} />
            ))}
          </main>
        )}
      </>
    );
  }
}

export default App;
