'use client';

import { JSX } from 'react';
import classnames from 'classnames';
import { useTheme } from '../../context/useTheme';
import { useRouter, useSearchParams } from 'next/navigation';

import style from './Pagination.module.css';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props): JSX.Element {
  const { theme } = useTheme();

  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const cardDetails = searchParams.get('details') || '';

  const changePage = (pageNumber: number) => {
    const params = new URLSearchParams({
      page: pageNumber.toString(),
      search: searchQuery,
      details: cardDetails || '',
    });
    router.push(`/?${params}`);
  };

  const onPreviousPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  return (
    <div className={classnames(style.pagination, { [style.dark]: theme === 'light' })}>
      <button type="button" disabled={currentPage === 1} className={style.prev} onClick={onPreviousPage}>
        ←
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button type="button" disabled={currentPage === totalPages} className={style.next} onClick={onNextPage}>
        →
      </button>
    </div>
  );
}
