import ErrorBoundary from 'components/error-boundary';
import Services from 'components/services';
import stationData from 'data/station_codes.json';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  for (const [locationName, crs] of stationData) {
    if (crs === context.params?.crs) {
      return { props: { crs, locationName } };
    }
  }
  context.res.statusCode = 404;
  return { props: {} };
}

export default function StationPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props.crs) {
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
        <title>Services via {props.locationName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 m-auto container">
        <div className="flex justify-between items-baseline mb-4">
          <h1 className="text-4xl font-marker leading-none">
            Services via {props.locationName}
          </h1>
          <Link href="/">
            <a className="px-4 text-4xl opacity-50" title="Home">
              ×
            </a>
          </Link>
        </div>
        <ErrorBoundary>
          <Services crs={props.crs} />
        </ErrorBoundary>
      </main>
    </>
  );
}
