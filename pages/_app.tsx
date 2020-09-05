import ErrorBoundary from 'components/ErrorBoundary';
import { AppProps } from 'next/app';
import 'styles/inter.css';
import 'styles/tailwind.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
