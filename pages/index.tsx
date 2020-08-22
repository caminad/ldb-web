import PoweredByNationalRailEnquiries from 'components/logos/powered-by-national-rail-enquiries';
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-2">
      <Head>
        <title>Unofficial National Rail Live Departure Boards</title>
      </Head>

      <main className="flex flex-col justify-center m-auto">
        <h1 className="text-4xl text-center font-marker pb-4">
          Unofficial National Rail Live Departure Boards
        </h1>

        <div className="flex flex-col justify-center items-center">
          <Link href="/stations">
            <a className="w-full h-12 border border-b-2 border-current p-2 rounded shadow flex flex-col justify-around focus:outline-none focus:text-blue-500">
              <span>Search Stations</span>
            </a>
          </Link>
        </div>
      </main>

      <footer>
        <PoweredByNationalRailEnquiries />
      </footer>
    </div>
  );
}
