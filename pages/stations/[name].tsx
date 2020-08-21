import ErrorBoundary from 'components/error-boundary';
import PoweredByNationalRailEnquiries from 'components/logos/powered-by-national-rail-enquiries';
import SearchBox from 'components/search-box';
import Services from 'components/services';
import { decodeName, encodeName } from 'models/station';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function StationPage() {
  const router = useRouter();

  const name = decodeName(router.query.name);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-2">
      <Head>
        <title>Services via {name}</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 container">
        <div className="flex items-stretch mb-2">
          <Link href="/">
            <a className="rounded px-2 flex items-center">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="sr-only">Home</span>
            </a>
          </Link>
          <ErrorBoundary>
            <SearchBox
              className="w-full"
              key={name}
              label="Station Name"
              initialValue={name}
              href="/stations/[name]"
              asPathFn={(value) => `/stations/${encodeName(value)}`}
            />
          </ErrorBoundary>
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
