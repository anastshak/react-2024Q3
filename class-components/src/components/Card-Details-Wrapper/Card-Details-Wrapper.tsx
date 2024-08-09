'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import CardDetails from '../Card-Details/Card-Details';

import style from './Card-Details-Wrapper.module.css';
import classnames from 'classnames';
import { useTheme } from '../../context/useTheme';

export default function CardDetailsWrapper() {
  const { theme } = useTheme();

  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const details = searchParams.get('details') || '';

  const handleCloseDetails = () => {
    const params = new URLSearchParams({ page: page.toString(), search: searchQuery });
    router.push(`/?${params}`);
  };

  return (
    <aside className={classnames(style.detailSide, { [style.dark]: theme === 'light' })}>
      <button type="button" onClick={handleCloseDetails}>
        Close
      </button>
      <CardDetails id={details} />
    </aside>
  );
}
