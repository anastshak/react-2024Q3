import { Metadata } from 'next';
import { ErrorBoundary } from '../components/Error/Error-boundary/Error-boundary';
import { ErrorPage } from '../components/Error/Error-page/Error-page';
import { ThemeProvider } from '../context/themeContext';
import StoreProvider from './StoreProvider';

import '../styles/global.css';

export const metadata: Metadata = {
  title: 'Task 4-2',
  description: 'Star Wars characters',
  icons: {
    icon: '/starwars.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            <ErrorBoundary fallback={<ErrorPage />}>{children}</ErrorBoundary>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
