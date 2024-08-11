import { useSearchParams } from '@remix-run/react';

import CardDetails from '@components/Card-Details/Card-Details';
import { CharacterDetails } from '../../types/types';

import { useTheme } from '@context/useTheme';
import classnames from 'classnames';
import style from './Card-Details-Wrapper.module.css';

type Props = {
  details: CharacterDetails;
};

export default function CardDetailsWrapper({ details }: Props) {
  const { theme } = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const pageNumber = searchParams.get('page') || '1';

  const handleCloseDetails = () => {
    setSearchParams({ page: pageNumber, search: searchQuery });
  };

  return (
    <aside className={classnames(style.detailSide, { [style.dark]: theme === 'light' })}>
      <button type="button" onClick={handleCloseDetails}>
        Close
      </button>
      <CardDetails details={details} />
    </aside>
  );
}
