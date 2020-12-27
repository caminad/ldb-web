import PoweredByNationalRailEnquiries from 'components/PoweredByNationalRailEnquiries';
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-2">
      <Head>
        <title>Unofficial National Rail Live Departure Boards</title>
        <meta
          name="description"
          content="Live arrivals and departures via UK stations, powered by National Rail Enquiries."
        />
      </Head>

      <main className="flex flex-col justify-center m-auto">
        <h1 className="pb-4 text-4xl font-extrabold tracking-tighter text-center">
          Unofficial National Rail Live Departure Boards
        </h1>

        <div className="flex flex-col items-center justify-center">
          <Link href="/stations">
            <a className="flex flex-col justify-around w-full h-12 p-2 font-medium border border-b-2 border-current rounded shadow focus:outline-none focus:text-blue-500">
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
