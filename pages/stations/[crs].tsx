import Services from 'components/services';
import stations from 'data/station_codes.json';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export async function getStaticProps(context: GetStaticPropsContext) {
  const station = stations.find((item) => {
    return item.crs === context.params?.crs;
  });
  return {
    props: {
      station: station ?? null,
    },
  };
}

export default function StationPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Head>
        <title>Loading...</title>
      </Head>
    );
  }

  if (!props.station) {
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
        <title>Services via {props.station.locationName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 m-auto container">
        <h1 className="text-4xl font-bold mb-4">
          Services via {props.station.locationName}
        </h1>
        <Services via={props.station} />
      </main>
    </>
  );
}
