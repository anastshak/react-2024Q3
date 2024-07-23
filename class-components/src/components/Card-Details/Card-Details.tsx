import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { fetchDetails } from '../../services/api';
import { CharacterDetails } from '../../types/types';

import style from './Card-Details.module.css';

type Props = {
  id: string;
};

export default function CardDetails({ id }: Props): JSX.Element {
  const [details, setDetails] = useState<CharacterDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDetails(id);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailsData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!details) {
    return <p>No details available</p>;
  }

  return (
    <div className={style.card}>
      <div className={style.info}>
        Name: <span>{details.name}</span>
      </div>
      <div className={style.info}>
        Height: <span>{details.height}</span>
      </div>
      <div className={style.info}>
        Mass: <span>{details.mass}</span>
      </div>
      <div className={style.info}>
        Birth year: <span>{details.birth_year}</span>
      </div>
      <div className={style.info}>
        Gender: <span>{details.gender}</span>
      </div>
      <div className={style.info}>
        Hair Color: <span>{details.hair_color}</span>
      </div>
      <div className={style.info}>
        Skin Color: <span>{details.skin_color}</span>
      </div>
      <div className={style.info}>
        Eye Color: <span>{details.eye_color}</span>
      </div>
    </div>
  );
}
