import HomeButton from 'components/HomeButton';
import SearchBarLink from 'components/SearchBarLink';
import Station from 'components/Station';
import stations from 'data/stations.json';
import { decodeName } from 'models/Station';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] };
};

export const getStaticProps: GetStaticProps<
  { name: string; crs: string } | { name: null; crs: null }
> = async ({ params }) => {
  const name = decodeName(params?.name);
  const crs = (stations as Record<string, string | undefined>)[name];
  if (crs) {
    return { props: { name, crs } };
  } else {
    return { props: { name: null, crs: null } };
  }
};

export default function StationPage({
  name,
  crs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col items-center justify-between max-w-screen-sm min-h-screen p-2 m-auto">
      {name ? (
        <Head>
          <title>{name} Live Departure Boards</title>
          <meta
            name="description"
            content={`Live arrivals and departures via ${name}, powered by National Rail Enquiries.`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      ) : (
        <Head>
          <title>Not Found</title>
          <meta name="robots" content="noindex" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}

      <main className="w-full space-y-2">
        <div className="relative flex flex-col max-w-screen-sm pl-10 m-auto">
          <HomeButton />
          <SearchBarLink name={name} />
        </div>

        {crs ? (
          <Station key={name} crs={crs} />
        ) : (
          <div className="py-2">
            <span className="inline-block font-extrabold">Not Found</span>
          </div>
        )}
      </main>
    </div>
  );
}
