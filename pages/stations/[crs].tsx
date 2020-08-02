import { Client as LiveDepartureBoardClient } from '@kitibyte/ldb/ldb.js';
import ErrorBoundary from 'components/error-boundary';
import Services from 'components/services';
import stations from 'data/station_codes.json';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';

const liveDepartureBoardClient = new LiveDepartureBoardClient({
  accessToken: process.env.LDB_TOKEN,
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const station = stations.find((item) => {
    return item.crs === context.params?.crs;
  });
  if (!station) {
    context.res.statusCode = 404;
    return { props: {} };
  }
  const services = await liveDepartureBoardClient.request(
    'ArrivalsDepartures',
    { crs: station.crs, numRows: 6 }
  );
  return { props: { services } };
}

export default function StationPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props.services) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Services via {props.services.locationName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 m-auto container">
        <div className="flex justify-between items-baseline mb-4">
          <h1 className="text-4xl font-marker leading-none">
            Services via {props.services.locationName}
          </h1>
          <Link href="/">
            <a className="px-4 text-4xl opacity-50" title="Home">
              ×
            </a>
          </Link>
        </div>
        <ErrorBoundary>
          <Services {...props.services} />
        </ErrorBoundary>
      </main>
    </>
  );
}
