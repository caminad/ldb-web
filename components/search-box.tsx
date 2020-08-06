// Icons from https://heroicons.dev/

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const inputId = 'search-box-input'; // Assumes that this component is only rendered once per page.

function selectNext<T>(x: T | undefined, xs: T[]): T | undefined {
  return xs[xs.indexOf(x as T) + 1] || xs[0];
}
function selectPrevious<T>(x: T | undefined, xs: T[]): T | undefined {
  return xs[xs.indexOf(x as T) - 1] || xs[xs.length - 1];
}

export default function SearchBox(props: {
  label: string;
  suggestions: string[];
  href: string;
  asPathFn: (value: string) => string;
  onValue?: (value: string) => void;
}): JSX.Element {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<string | undefined>(
    props.suggestions[0]
  );

  useEffect(() => {
    if (selected) {
      router.prefetch(props.href, props.asPathFn(selected));
    }
  }, [selected]);

  useEffect(() => {
    props.onValue?.(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!selected || !props.suggestions.includes(selected)) {
      setSelected(props.suggestions[0]);
    }
  }, [selected, props.suggestions]);

  return (
    <div>
      <div
        className={clsx(
          'border-2 focus-within:shadow-outline rounded-lg p-2 bg-white flex justify-center',
          { 'border-blue-600': searchTerm !== '' }
        )}
      >
        <form
          className="flex"
          onSubmit={(event) => {
            if (selected) {
              router.push(props.href, props.asPathFn(selected));
            }
            event.preventDefault();
          }}
        >
          <label
            className="flex items-center pl-2 opacity-50"
            htmlFor={inputRef.current?.id}
          >
            <svg
              width={24}
              height={24}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span className="sr-only">{props.label}</span>
          </label>
          <input
            className="appearance-none flex-grow text-2xl min-w-0 pl-2 font-casual focus:outline-none"
            ref={inputRef}
            id={inputId}
            value={searchTerm}
            type="search"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            placeholder={props.label}
            onChange={(event) => {
              setSearchTerm(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                setSelected((s) => selectNext(s, props.suggestions));
                event.preventDefault();
              } else if (event.key === 'ArrowUp') {
                setSelected((s) => selectPrevious(s, props.suggestions));
                event.preventDefault();
              }
            }}
          />
        </form>
        <button
          className={clsx(
            'relative group flex items-center opacity-50 hover:text-red-600 hover:opacity-100 focus:outline-none focus:text-red-600 focus:opacity-100',
            { hidden: searchTerm === '' }
          )}
          onClick={(event) => {
            event.preventDefault();
            setSearchTerm('');
            inputRef.current?.focus();
          }}
        >
          {searchTerm !== '' && (
            <svg
              className="absolute right-0 z-10"
              width={20}
              height={20}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                fillRule="evenodd"
              ></path>
            </svg>
          )}
          {searchTerm !== '' && (
            <span className="hidden absolute right-0 pl-1 pr-6 py-2 bg-white group-hover:block group-focus:block">
              clear
            </span>
          )}
        </button>
      </div>

      <div
        className={clsx('mt-2 relative', {
          hidden: props.suggestions.length === 0,
        })}
      >
        <ul className="absolute inset-x-0 top-0 py-2 rounded-lg border bg-white shadow">
          {props.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className={clsx('px-2 flex', {
                'bg-blue-600 text-white': selected === suggestion,
              })}
              onMouseEnter={() => {
                setSelected(suggestion);
              }}
              onFocus={() => {
                setSelected(suggestion);
              }}
            >
              <div className="flex pl-2 py-2 opacity-50">
                <svg
                  width={24}
                  height={24}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <Link href={props.href} as={props.asPathFn(suggestion)}>
                <a className="w-full pl-2 focus:outline-none flex items-center">
                  <span>{suggestion}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
