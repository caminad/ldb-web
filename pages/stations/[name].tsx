import HomeButton from 'components/HomeButton';
import SearchBarLink from 'components/SearchBarLink';
import Station from 'components/Station';
import stations from 'data/stations.json';
import { decodeName } from 'models/Station';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'unstable_blocking', paths: [] };
};

export const getStaticProps: GetStaticProps<
  { name: string | null },
  { name?: string }
> = async ({ params }) => {
  const name = decodeName(params?.name);
  if (name in stations) {
    return { props: { name } };
  } else {
    return { props: { name: null } };
  }
};

export default function StationPage({
  name,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-2 max-w-screen-sm m-auto">
      {name ? (
        <Head>
          <title>{name}</title>
          <meta
            name="description"
            content={`Live Arrivals and Departures at ${name}.`}
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
        <div className="flex flex-col relative max-w-screen-sm m-auto pl-10">
          <HomeButton />
          <SearchBarLink name={name} />
        </div>

        {name ? (
          <Station key={name} name={name} />
        ) : (
          <div className="py-2">
            <span className="inline-block font-extrabold">Not Found</span>
          </div>
        )}
      </main>
    </div>
  );
}
