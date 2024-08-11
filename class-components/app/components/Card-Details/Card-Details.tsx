import type { JSX } from 'react';
import { CharacterDetails } from '../../types/types';

import { useTheme } from '@context/useTheme';
import classnames from 'classnames';
import style from './Card-Details.module.css';

type Props = {
  details: CharacterDetails;
};

export default function CardDetails({ details }: Props): JSX.Element {
  const { theme } = useTheme();

  if (details.name == undefined) {
    return <p>No details available</p>;
  }

  return (
    <div className={classnames(style.card, { [style.dark]: theme === 'light' })}>
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
