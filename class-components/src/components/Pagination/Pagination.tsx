import { JSX } from 'react';
import style from './Pagination.module.css';

type Props = {
  prev: () => void;
  next: () => void;
};

export default function Pagination({ next, prev }: Props): JSX.Element {
  return (
    <div className={style.pagination}>
      <button type="button" className={style.prev} onClick={() => prev()}>
        ←
      </button>
      <button type="button" className={style.next} onClick={() => next()}>
        →
      </button>
    </div>
  );
}
