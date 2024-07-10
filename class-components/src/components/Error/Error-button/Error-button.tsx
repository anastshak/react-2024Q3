import React from 'react';
import type { ReactNode } from 'react';

import styles from './Error-button.module.css';

type State = {
  throwError: boolean;
};

export class ErrorButton extends React.Component {
  state: State = {
    throwError: false,
  };

  handleThrowError(): void {
    this.setState({ throwError: true });
  }

  render(): ReactNode {
    if (this.state.throwError) {
      throw new Error('Error');
    }

    return (
      <button className={styles.errorBtn} onClick={() => this.handleThrowError()} type="button">
        throw error
      </button>
    );
  }
}
