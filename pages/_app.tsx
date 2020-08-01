import ErrorBoundary from 'components/error-boundary';
import { AppProps } from 'next/app';
import 'styles/tailwind.css';
import { ConfigInterface, SWRConfig } from 'swr';

const swrConfig: ConfigInterface = {
  async fetcher(key) {
    const res = await fetch(key);
    return res.json();
  },
};

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SWRConfig value={swrConfig}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </SWRConfig>
  );
}
