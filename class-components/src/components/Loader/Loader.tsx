import style from './Loader.module.css';

export default function Loader() {
  return (
    <div className={style.loader} data-testid="loader">
      <div className={style.loaderSpinner}></div>
    </div>
  );
}
