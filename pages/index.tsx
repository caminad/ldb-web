import ErrorBoundary from 'components/error-boundary';
import StationSearch from 'components/station-search';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div className="h-screen">
      <Head>
        <title>Unofficial National Rail Live Departure Boards</title>
      </Head>

      <main className="p-4 h-full m-auto container flex flex-col justify-center space-y-8">
        <h1 className="text-4xl text-center font-marker">
          Unofficial National Rail Live Departure Boards
        </h1>

        <ErrorBoundary>
          <StationSearch />
        </ErrorBoundary>
      </main>
    </div>
  );
}
