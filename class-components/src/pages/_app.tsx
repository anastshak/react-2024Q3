import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../context/themeContext';
import Head from 'next/head';

import '../styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Head>
          <title>Task 4</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
