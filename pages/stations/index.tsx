import { AriaSearchFieldProps } from '@react-types/searchfield';
import useStationSuggestions from 'hooks/useStationSuggestions';
import { decodeName, encodeName } from 'models/Station';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useButton, useCollator, useSearchField } from 'react-aria';
import { useSearchFieldState } from 'react-stately';

function BackButton() {
  const buttonRef = useRef<HTMLElement>(null);
  const { buttonProps } = useButton(
    {
      'aria-label': 'Back',
      onPress() {
        Router.back();
      },
    },
    buttonRef
  );

  return (
    <button
      className="absolute top-0 left-0 flex items-center h-12 p-2 focus:text-blue-500 hover:text-blue-500"
      data-cy="BackButton"
      {...buttonProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
}

function SearchField(props: AriaSearchFieldProps) {
  const searchFieldState = useSearchFieldState(props);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const { inputProps } = useSearchField(props, searchFieldState, inputRef);

  return (
    <input
      ref={inputRef}
      className="w-full h-12 p-2 font-medium placeholder-current border border-b-2 border-current rounded shadow appearance-none focus:outline-none focus:text-blue-500"
      data-cy="SearchField"
      autoCorrect="off"
      spellCheck="false"
      {...inputProps}
    />
  );
}

export default function StationsPage() {
  const { query } = useRouter();
  const [searchTerm, setSearchTerm] = useState(decodeName(query.search));
  const suggestedNames = useStationSuggestions(searchTerm);

  const { compare } = useCollator({ sensitivity: 'base', usage: 'search' });

  useEffect(() => {
    const query = searchTerm ? { search: searchTerm } : null;
    Router.replace({ query }, undefined, { shallow: true });
  }, [searchTerm]);

  return (
    <main className="p-2">
      <Head>
        <title>Unofficial National Rail Live Departure Boards</title>
        <meta
          name="description"
          content="Live arrivals and departures via UK stations, powered by National Rail Enquiries."
        />
      </Head>

      <div className="relative flex flex-col max-w-screen-sm pl-10 m-auto">
        <BackButton />

        <SearchField
          placeholder="Search Stations"
          aria-label="Search"
          value={searchTerm}
          autoFocus={true}
          autoComplete="off"
          onChange={(value) => {
            setSearchTerm(value);
          }}
          onSubmit={(value) => {
            const matchingName = suggestedNames.find((suggestedName) => {
              return compare(value, suggestedName) === 0;
            });
            if (matchingName) {
              Router.push(
                '/stations/[name]',
                `/stations/${encodeName(matchingName)}`
              );
            }
          }}
        />

        <ul className="flex flex-col mt-2 overflow-auto">
          {suggestedNames.map((suggestedName) => (
            <li className="p-1" key={suggestedName}>
              <Link href={`/stations/${encodeName(suggestedName)}`}>
                <a className="block p-1 font-medium whitespace-no-wrap hover:underline hover:text-blue-500 focus:underline focus:text-blue-500">
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
