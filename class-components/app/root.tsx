import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react';
import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { Provider } from 'react-redux';

import { store } from '@store/store';
import { ThemeProvider } from '@context/themeContext';
import Header from '@components/Header/Header';
import { ErrorNotFoundPage } from '@components/NotFoundPage/ErrorNotFound';
import { ErrorPage } from '@components/Error/Error-page/Error-page';

import './styles/global.css';

export const meta: MetaFunction = () => [{ title: 'Task 4-3' }, { name: 'description', content: 'Welcome to Remix!' }];
export const links: LinksFunction = () => [{ rel: 'icon', type: 'image/svg', href: '/starwars.svg' }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorNotFoundPage />;
  }

  console.error('it is broken :(', error);

  return <ErrorPage />;
}
