import ErrorBoundary from 'components/error-boundary';
import StationSearch from 'components/station-search';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Unofficial National Rail Live Departure Boards</title>
      </Head>

      <main className="p-4 m-auto container">
        <h1 className="text-4xl font-bold text-center">
          Unofficial National Rail Live Departure Boards
        </h1>

        <ErrorBoundary>
          <StationSearch />
        </ErrorBoundary>
      </main>
    </div>
  );
}
