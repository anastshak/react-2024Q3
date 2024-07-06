import React from 'react';
import type { ReactNode } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Card, { Character } from './components/Card/Card';
import { fetchData } from './services/api';

class App extends React.Component {
  state = {
    cards: [],
  };

  componentDidMount(): void {
    fetchData().then((data) => this.setState({ cards: data }));
  }

  render(): ReactNode {
    return (
      <>
        <Search />
        <section className="cards">
          {this.state.cards.map((card: Character) => (
            <Card key={card.name} card={card} />
          ))}
        </section>
      </>
    );
  }
}

export default App;
