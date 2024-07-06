import React from 'react';
import style from './Card.module.css';

type Character = {
  name: string;
  gender: string;
  height: number;
  birth_year: string;
};

export default class Card extends React.Component<{ card: Character }> {
  render() {
    const { card } = this.props;
    return (
      <div className={style.card}>
        <div className={style.info}>
          Name: <span>{card.name}</span>
        </div>
        <div className={style.info}>
          Gender: <span>{card.gender}</span>
        </div>
        <div className={style.info}>
          Height: <span>{card.height}</span>
        </div>
        <div className={style.info}>
          Birth year: <span>{card.birth_year}</span>
        </div>
      </div>
    );
  }
}
