import { JSX } from 'react';
import { useTheme } from '../../context/useTheme';
import classnames from 'classnames';

import styles from './Theme-Switcher.module.css';

export default function ThemeSwitcher(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  const onToggle = () => {
    toggleTheme();
  };

  return (
    <div className={classnames(styles.switcher, { [styles.dark]: theme === 'light' })}>
      <button onClick={onToggle} className={styles.btn}>
        Change Theme
      </button>
    </div>
  );
}
