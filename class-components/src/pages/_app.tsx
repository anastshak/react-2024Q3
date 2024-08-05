import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ThemeProvider } from '../context/themeContext';
import { ErrorBoundary } from '../components/Error/Error-boundary/Error-boundary';
import { ErrorPage } from '../components/Error/Error-page/Error-page';
import Loader from '../components/Loader/Loader';
import { wrapper } from '../store/store';

import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
  };

  const end = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Head>
          <title>Task 4</title>
        </Head>
        <ErrorBoundary fallback={<ErrorPage />}>{isLoading ? <Loader /> : <Component {...pageProps} />}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
