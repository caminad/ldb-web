import ErrorBoundary from 'components/error-boundary';
import StationSearch from 'components/station-search';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col justify-evenly items-center p-2">
      <Head>
        <title>Unofficial National Rail Live Departure Boards</title>
      </Head>

      <main className="flex flex-col justify-center space-y-8">
        <h1 className="text-4xl text-center font-marker">
          Unofficial National Rail Live Departure Boards
        </h1>

        <ErrorBoundary>
          <StationSearch />
        </ErrorBoundary>
      </main>

      <footer className="text-xl text-center">
        <span className="font-casual">Powered by</span>{' '}
        <a
          className="font-bold inline-block"
          href="https://www.nationalrail.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
        >
          National Rail Enquiries
        </a>
      </footer>
    </div>
  );
}
