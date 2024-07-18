import type { JSX } from 'react';
import { ErrorBoundary } from './components/Error/Error-boundary/Error-boundary.tsx';
import { ErrorPage } from './components/Error/Error-page/Error-page.tsx';
import HomePage from './pages/Home/Home';

import './App.css';

export function App(): JSX.Element {
  return (
    <>
      <ErrorBoundary fallback={<ErrorPage />}>
        <HomePage />
      </ErrorBoundary>
    </>
  );
}

export default App;
