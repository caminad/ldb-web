import ErrorBoundary from 'components/error-boundary';
import PoweredByNationalRailEnquiries from 'components/logos/powered-by-national-rail-enquiries';
import Services from 'components/services';
import { decodeName } from 'models/station';
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
        <div className="flex justify-between items-baseline mb-4">
          <h1 className="text-4xl font-marker leading-none">
            Services via {name}
          </h1>
          <Link href="/">
            <a className="px-4 text-4xl opacity-50 font-marker" title="Home">
              ×
            </a>
          </Link>
        </div>
        <ErrorBoundary>
          <Services locationName={name} />
        </ErrorBoundary>
      </main>

      <footer>
        <PoweredByNationalRailEnquiries />
      </footer>
    </div>
  );
}
