import clsx from 'clsx';
import { formatDistanceToNow, parseISO } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import castArray from 'lodash/castArray';
import { encodeName } from 'models/station';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, useCallback, useState } from 'react';
import useSWR, { mutate } from 'swr';

type OneOrMany<T> = T | T[];

export interface Service {
  serviceID: string;
  origin: { locationName: string };
  destination: OneOrMany<{ locationName: string; via?: string }>;
  operator: string;
  sta?: string;
  eta?: string;
  std?: string;
  etd?: string;
  platform?: string;
  isCancelled?: boolean;
  delayReason?: string;
  cancelReason?: string;
}

interface Station {
  locationName: string;
  generatedAt: string;
  nrccMessages?: OneOrMany<string>;
  platformAvailable?: boolean;
  trainServices?: OneOrMany<Service>;
  busServices?: OneOrMany<Service>;
}

const PAGE_SIZE = 20;

function useLiveServices(locationName: string) {
  const [limit, setLimit] = useState(PAGE_SIZE);
  const key = locationName
    ? `/api/stations/${encodeName(locationName)}?limit=${limit}`
    : null;

  const { data, error } = useSWR<Station>(key, {
    refreshInterval: 25000,
  });

  const allServices = ([] as Service[]).concat(
    data?.busServices ?? [],
    data?.trainServices ?? []
  );

  const loadMore = useCallback(async () => {
    const nextLimit = limit + PAGE_SIZE;
    // Populate the next page with the current results to preserve visible items.
    await mutate(
      `/api/stations/${encodeName(locationName)}?limit=${nextLimit}`,
      data
    );
    setLimit(nextLimit);
  }, [limit, locationName, data]);

  const canLoadMore = Boolean(data) && allServices.length === limit;

  return { data, error, allServices, loadMore, canLoadMore };
}

function useDistanceToNow(isoDateString?: string) {
  const { data } = useSWR([isoDateString, formatDistanceToNow], {
    fetcher(key) {
      return formatDistanceToNow(parseISO(key), {
        locale: enGB,
        addSuffix: true,
      });
    },
    refreshInterval: 1000,
  });

  return data;
}

function Messages(props: { value: OneOrMany<string> }) {
  return (
    <details className="rounded border">
      <summary className="p-1 cursor-pointer font-bold rounded">
        Messages
      </summary>
      <ul className="p-1 space-y-2 border-t text-gray-700 text-sm">
        {castArray(props.value).map((message, index) => (
          <li key={`${index}-${message}`} className="whitespace-pre-line">
            {message
              .replace(/<\/?.*?>/g, '')
              .replace(
                / More (?:information|details) can be found in Latest Travel News./,
                ''
              )}
          </li>
        ))}
      </ul>
    </details>
  );
}

function ServiceTime(props: { children: string; estimate?: string }) {
  const offSchedule = props.estimate !== 'On time';
  return (
    <span>
      <span className={clsx({ 'line-through text-gray-500': offSchedule })}>
        {props.children}
      </span>{' '}
      {offSchedule && <span className="font-bold">{props.estimate}</span>}
    </span>
  );
}

function Platform(props: { children?: string }) {
  if (!props.children) return null;
  return (
    <span
      className="px-1 rounded font-bold text-xs bg-current"
      title="Platform"
    >
      <span className="text-white">{props.children}</span>
    </span>
  );
}

function Location(props: {
  direction: 'to' | 'from' | 'via';
  children: string;
}) {
  return (
    <span>
      {props.direction}{' '}
      <Link
        href="/stations/[name]"
        as={`/stations/${encodeName(props.children)}`}
      >
        <a className="inline-block font-bold hover:underline hover:text-blue-500 focus:underline focus:text-blue-500">
          {props.children}
        </a>
      </Link>
    </span>
  );
}

function Operator(props: { children: string }) {
  return (
    <span className="px-1 border rounded text-xs" title="Operator">
      {props.children}
    </span>
  );
}

function DetailWrapper(props: { children: ReactNode; isCancelled?: boolean }) {
  return (
    <div
      className={clsx(
        'whitespace-no-wrap overflow-x-auto flex items-center space-x-2',
        {
          'text-gray-500': props.isCancelled,
        }
      )}
    >
      {props.children}
    </div>
  );
}

function Arrival(props: {
  scheduled: string;
  estimated?: string;
  isCancelled?: boolean;
  from: string;
  platform?: string;
  operator: string;
}) {
  return (
    <DetailWrapper isCancelled={props.isCancelled}>
      <ServiceTime estimate={props.estimated}>{props.scheduled}</ServiceTime>
      <Platform>{props.platform}</Platform>
      <p>
        <Location direction="from">{props.from}</Location>
      </p>
      <Operator>{props.operator}</Operator>
    </DetailWrapper>
  );
}

function Departure(props: {
  scheduled: string;
  estimated?: string;
  isCancelled?: boolean;
  to: string[];
  via?: string;
  platform?: string;
  operator: string;
}) {
  return (
    <DetailWrapper isCancelled={props.isCancelled}>
      <ServiceTime estimate={props.estimated}>{props.scheduled}</ServiceTime>
      <Platform>{props.platform}</Platform>
      <p>
        {props.to.map((destination) => (
          <>
            <Location key={destination} direction="to">
              {destination}
            </Location>{' '}
          </>
        ))}
        {props.via && (
          <Location key={props.via} direction="via">
            {props.via}
          </Location>
        )}
      </p>
      <Operator>{props.operator}</Operator>
    </DetailWrapper>
  );
}

function Reason(props: { children?: string }) {
  if (!props.children) {
    return null;
  }
  return (
    <span className="text-gray-500 text-sm">
      ({props.children.replace(/^This train has been /, '')})
    </span>
  );
}

export default function Services(props: { locationName: string }): JSX.Element {
  const { data, error, allServices, canLoadMore, loadMore } = useLiveServices(
    props.locationName
  );

  const distanceToNow = useDistanceToNow(data?.generatedAt);

  if (error?.code === 404) {
    return (
      <div className="font-bold">
        <Head>
          <title>Not Found</title>
        </Head>
        Not Found
      </div>
    );
  }

  return (
    <div className="py-2 space-y-4">
      {distanceToNow ? (
        <p>
          <span className="font-bold">Live Arrivals and Departures</span>{' '}
          <span className="text-gray-700 text-sm">
            (updated {distanceToNow})
          </span>
        </p>
      ) : (
        <p>Loading...</p>
      )}
      {data?.nrccMessages && <Messages value={data.nrccMessages} />}
      <ul className="max-w-full relative pl-6 flex flex-col space-y-2 overflow-x-auto">
        {allServices.map((service) => (
          <>
            {service.sta && service.origin?.locationName && (
              <li
                className="flex flex-col"
                key={service.serviceID + '-arrival'}
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="login absolute left-0 w-6 h-6 text-pink-500"
                >
                  <title>Arrival</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <Arrival
                  scheduled={service.sta}
                  estimated={service.eta}
                  isCancelled={service.isCancelled}
                  from={service.origin.locationName}
                  platform={service.platform}
                  operator={service.operator}
                />
                <Reason>{service.cancelReason || service.delayReason}</Reason>
              </li>
            )}
            {service.std && castArray(service.destination)[0]?.locationName && (
              <li
                className="flex flex-col"
                key={service.serviceID + '-departure'}
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="logout absolute left-0 w-6 h-6 text-indigo-500"
                >
                  <title>Departure</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <Departure
                  scheduled={service.std}
                  estimated={service.etd}
                  isCancelled={service.isCancelled}
                  to={castArray(service.destination).map((d) => d.locationName)}
                  via={castArray(service.destination)[0].via?.replace(
                    /^via /,
                    ''
                  )}
                  platform={service.platform}
                  operator={service.operator}
                />
                <Reason>{service.cancelReason || service.delayReason}</Reason>
              </li>
            )}
          </>
        ))}
      </ul>
      <div className="h-8">
        {canLoadMore && (
          <button
            className="w-full h-full rounded border hover:border-blue-500"
            onClick={loadMore}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
