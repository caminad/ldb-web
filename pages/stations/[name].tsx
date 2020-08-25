import PlaceholderList from 'components/PlaceholderList';
import PoweredByNationalRailEnquiries from 'components/PoweredByNationalRailEnquiries';
import ServiceList from 'components/ServiceList';
import Summary from 'components/Summary';
import stations from 'data/stations.json';
import useLiveServices from 'hooks/useLiveServices';
import castArray from 'lodash/castArray';
import { decodeName, encodeName } from 'models/Station';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

function HomeButton() {
  return (
    <Link href="/">
      <a
        className="absolute top-0 left-0 h-12 p-2 flex items-center focus:text-blue-500 hover:text-blue-500"
        title="Home"
      >
        <svg
          className="home w-6 h-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="sr-only">Home</span>
      </a>
    </Link>
  );
}

function SearchBarLink({ name }: { name: string | null }) {
  return (
    <Link
      href={{
        pathname: '/stations',
        query: name && { search: encodeName(name) },
      }}
    >
      <a className="w-full h-12 border border-b-2 border-current p-2 rounded shadow flex flex-col justify-around font-medium focus:outline-none focus:text-blue-500">
        <span className="truncate">{name || 'Search Stations'}</span>
      </a>
    </Link>
  );
}

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
  const [data, loadMore] = useLiveServices(name || undefined);

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

        <div className="py-2 space-y-4">
          <Summary
            label={name ? 'Live Arrivals and Departures' : 'Not Found'}
            generatedAt={data?.generatedAt}
            messages={castArray(data?.nrccMessages || [])}
          />
          {name && (
            <>
              {!data && <PlaceholderList />}
              {data?.busServices && (
                <ServiceList
                  items={castArray(data.busServices).map((service) => ({
                    ...service,
                    platform: 'bus',
                  }))}
                />
              )}
              {data?.trainServices && (
                <ServiceList items={castArray(data.trainServices)} />
              )}
              <div className="h-8">
                {loadMore && (
                  <button
                    className="w-full h-full rounded border hover:border-blue-500 font-semibold"
                    onClick={loadMore}
                  >
                    Show more
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <footer>{data && <PoweredByNationalRailEnquiries />}</footer>
    </div>
  );
}
