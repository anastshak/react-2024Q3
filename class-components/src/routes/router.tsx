import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { ErrorNotFoundPage } from '../pages/ErrorNotFound/ErrorNotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <ErrorNotFoundPage />,
  },
]);
