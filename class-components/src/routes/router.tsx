import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { ErrorNotFoundPage } from '../pages/ErrorNotFound/ErrorNotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // children: [
    //   {
    //     path: "details/:cardId",
    //     element: <CardDetails id={cardId} />,
    //   },
    // ],
  },
  {
    path: '*',
    element: <ErrorNotFoundPage />,
  },
]);
