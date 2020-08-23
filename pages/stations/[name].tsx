import ErrorBoundary from 'components/error-boundary';
import PoweredByNationalRailEnquiries from 'components/logos/powered-by-national-rail-enquiries';
import Services from 'components/services';
import { decodeName, encodeName } from 'models/station';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function StationPage() {
  const router = useRouter();

  const name = decodeName(router.query.name);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-2 max-w-screen-sm m-auto">
      <Head>
        <title>Services via {name}</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full space-y-2">
        <div className="flex flex-col relative max-w-screen-sm m-auto pl-10">
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

          <Link
            href={{
              pathname: '/stations',
              query: { search: encodeName(name) },
            }}
          >
            <a className="w-full h-12 border border-b-2 border-current p-2 rounded shadow flex flex-col justify-around font-medium focus:outline-none focus:text-blue-500">
              <span className="truncate">{name}</span>
            </a>
          </Link>
        </div>

        <ErrorBoundary>
          <Services key={name} locationName={name} />
        </ErrorBoundary>
      </main>

      <footer>
        <PoweredByNationalRailEnquiries />
      </footer>
    </div>
  );
}
