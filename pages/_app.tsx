import ErrorBoundary from 'components/ErrorBoundary';
import { AppProps } from 'next/app';
import { SSRProvider } from 'react-aria';
import 'styles/inter.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SSRProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </SSRProvider>
  );
}
