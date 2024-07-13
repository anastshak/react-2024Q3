import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
// import { ErrorBoundary } from './components/Error/Error-boundary/Error-boundary.tsx';
// import { ErrorPage } from './components/Error/Error-page/Error-page.tsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <ErrorBoundary fallback={<ErrorPage />}>
      <App />
    </ErrorBoundary> */}
  </React.StrictMode>
);
