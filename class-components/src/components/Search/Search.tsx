import React from 'react';
import type { ReactNode } from 'react';
import styles from './Search.module.css';

export default class Search extends React.Component {
  state = {
    cards: [],
    value: localStorage.getItem('searchValue') || '',
  };

  componentWillUnmount() {
    localStorage.setItem('searchValue', this.state.value);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  searchCharacter = async () => {
    this.componentWillUnmount();
    window.location.reload();
  };

  render(): ReactNode {
    const { value } = this.state;

    return (
      <>
        <section className={styles.search}>
          <input
            type="text"
            className={styles.input}
            placeholder="Please, enter your request"
            value={value}
            onChange={this.handleChange}
          ></input>
          <button type="button" className={styles.btn} onClick={this.searchCharacter}>
            Search
          </button>
        </section>
      </>
    );
  }
}
