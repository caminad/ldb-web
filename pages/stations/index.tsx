import useStationSuggestions from 'hooks/use-station-suggestions';
import { decodeName, encodeName } from 'models/station';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const nameCollator = Intl.Collator('en-GB', {
  sensitivity: 'base',
  usage: 'search',
});

export default function StationsPage() {
  const router = useRouter();
  const searchTerm = decodeName(router.query.search);
  const suggestedNames = useStationSuggestions(searchTerm);

  return (
    <main className="p-2">
      <Head>
        <title>Search Stations</title>
      </Head>

      <div className="flex flex-col relative max-w-screen-sm m-auto pl-10">
        <button
          className="absolute top-0 left-0 h-12 p-2 flex items-center focus:text-blue-500 hover:text-blue-500"
          title="Back"
          onClick={() => router.back()}
        >
          <svg
            className="chevron-left w-6 h-6"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Back</span>
        </button>

        <form
          onSubmitCapture={(e) => {
            e.preventDefault();
            const matchingName = suggestedNames.find((suggestedName) => {
              return nameCollator.compare(searchTerm, suggestedName) === 0;
            });
            if (matchingName) {
              router.push(
                '/stations/[name]',
                `/stations/${encodeName(matchingName)}`
              );
            }
          }}
        >
          <input
            className="w-full h-12 appearance-none border border-b-2 border-current p-2 rounded shadow placeholder-current font-medium focus:outline-none focus:text-blue-500"
            type="search"
            autoFocus={true}
            value={searchTerm}
            onChange={(e) => {
              const newSearchTerm = e.currentTarget.value;
              const query = newSearchTerm ? { search: newSearchTerm } : null;
              router.replace({ query }, undefined, { shallow: true });
            }}
            placeholder="Search Stations"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
          />
        </form>

        <ul className="mt-2 flex flex-col overflow-auto">
          {suggestedNames.map((suggestedName) => (
            <li className="p-1" key={suggestedName}>
              <Link
                href="/stations/[name]"
                as={`/stations/${encodeName(suggestedName)}`}
              >
                <a className="block p-1 whitespace-no-wrap font-medium hover:underline hover:text-blue-500 focus:underline focus:text-blue-500">
                  {suggestedName}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
