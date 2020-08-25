import ErrorBoundary from 'components/ErrorBoundary';
import { AppProps } from 'next/app';
import 'styles/inter.css';
import 'styles/tailwind.css';
import { ConfigInterface, SWRConfig } from 'swr';

class ErrorResponse extends Error {
  res: Response;

  constructor(res: Response) {
    super(res.statusText);
    this.res = res;
  }

  get code() {
    return this.res.status;
  }
}

const swrConfig: ConfigInterface = {
  async fetcher(key) {
    const res = await fetch(key);
    if (!res.ok) {
      throw new ErrorResponse(res);
    }
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
