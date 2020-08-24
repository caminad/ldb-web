import clsx from 'clsx';
import { formatDistanceToNow, parseISO } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import castArray from 'lodash/castArray';
import { encodeName } from 'models/station';
import Link from 'next/link';
import { ReactNode, useCallback, useReducer, useState } from 'react';
import useSWR, { mutate } from 'swr';

type OneOrMany<T> = T | T[];

export interface Service {
  serviceID: string;
  origin: { locationName: string };
  destination:
    | { locationName: string; via?: string }
    | { locationName: string }[];
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

function InfoButton(props: { onClick: () => void; hidden: boolean }) {
  return (
    <button
      className="hover:text-blue-500 focus:text-blue-500"
      onClick={props.onClick}
      hidden={props.hidden}
    >
      <svg
        className="information-circle w-6 h-6 rounded-full"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
      >
        <title>Information</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="sr-only">Information</span>
    </button>
  );
}

function Summary(props: {
  notFound: boolean;
  generatedAt: string | undefined;
  messages: string[];
}) {
  const [showMessages, toggleShowMessages] = useReducer(
    (state) => !state,
    false
  );

  const distanceToNow = useDistanceToNow(props.generatedAt);

  return (
    <div>
      <div className="relative pr-8">
        <span className="inline-block font-extrabold">
          Live Arrivals and Departures
        </span>{' '}
        <span className="inline-block text-gray-700 text-sm">
          {props.notFound && <>(not found)</>}
          {distanceToNow && <>(updated {distanceToNow})</>}
        </span>{' '}
        <span className="absolute top-0 right-0">
          <InfoButton
            onClick={toggleShowMessages}
            hidden={props.messages.length === 0}
          />
        </span>
      </div>

      <ul className="text-gray-700 text-sm" hidden={!showMessages}>
        {props.messages.map((message, index) => (
          <li key={index} className="mt-2 whitespace-pre-line">
            {message
              .replace(/<\/?.*?>/g, '')
              .replace(
                / More (?:information|details) can be found in Latest Travel News./,
                ''
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceTime(props: { children: string; estimate?: string }) {
  const offSchedule = props.estimate !== 'On time';
  return (
    <span className="font-features tabular-numbers stylistic-alternates font-medium">
      <span className={clsx({ 'line-through text-gray-500': offSchedule })}>
        {props.children}
      </span>{' '}
      {offSchedule && <span>{props.estimate}</span>}
    </span>
  );
}

function Platform(props: { children?: string }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center w-8 rounded bg-current text-xs font-semibold font-features tabular-numbers uppercase"
      title="Platform"
    >
      <span className="text-white">{props.children || '―'}</span>
    </div>
  );
}

function Location(props: { children: string }) {
  return (
    <Link
      href="/stations/[name]"
      as={`/stations/${encodeName(props.children)}`}
    >
      <a className="inline-block font-semibold hover:underline hover:text-blue-500 focus:underline focus:text-blue-500">
        {props.children}
      </a>
    </Link>
  );
}

function Operator(props: { children: string }) {
  return (
    <span
      className="px-1 border rounded text-xs font-medium tracking-tight"
      title="Operator"
    >
      {props.children}
    </span>
  );
}

function DetailWrapper(props: { children: ReactNode; isCancelled?: boolean }) {
  return (
    <div
      className={clsx(
        'whitespace-no-wrap overflow-x-auto flex items-center space-x-1',
        {
          'text-gray-500': props.isCancelled,
        }
      )}
    >
      {props.children}
    </div>
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

function PlaceholderList() {
  return (
    <ul className="flex flex-col space-y-2">
      {[4, 10, 0, 6, 2, 2, 6, 1, 6, 0, 10, 10, 10, 0, 5, 3, 0, 6, 4, 11].map(
        (x, i) => (
          <li key={i}>
            <div
              className="h-6 max-w-full rounded bg-gray-200 animate-pulse"
              style={{ width: `${15 + x}rem` }}
            />
          </li>
        )
      )}
    </ul>
  );
}

function ServiceList(props: { items: Service[] }) {
  return (
    <ul className="max-w-full flex flex-col space-y-2 overflow-x-auto">
      {props.items.map((service) => (
        <>
          {service.sta && service.origin?.locationName && (
            <li className="flex flex-col" key={service.serviceID + '-arrival'}>
              <DetailWrapper isCancelled={service.isCancelled}>
                <ServiceTime estimate={service.eta}>{service.sta}</ServiceTime>
                <Platform>{service.platform}</Platform>
                <span className="font-black text-pink-500">⟵</span>
                <Location>{service.origin.locationName}</Location>
                <Operator>{service.operator}</Operator>
              </DetailWrapper>
              <Reason>{service.cancelReason || service.delayReason}</Reason>
            </li>
          )}
          {service.std && castArray(service.destination)[0]?.locationName && (
            <li
              className="flex flex-col"
              key={service.serviceID + '-departure'}
            >
              <DetailWrapper isCancelled={service.isCancelled}>
                <ServiceTime estimate={service.etd}>{service.std}</ServiceTime>
                <Platform>{service.platform}</Platform>
                <span className="font-black text-indigo-500">⟶</span>
                {castArray(service.destination)
                  .map((d) => d.locationName)
                  .map((destination) => (
                    <Location key={destination}>{destination}</Location>
                  ))}
                {!Array.isArray(service.destination) &&
                  service.destination.via && (
                    <span> {service.destination.via}</span>
                  )}
                <Operator>{service.operator}</Operator>
              </DetailWrapper>
              <Reason>{service.cancelReason || service.delayReason}</Reason>
            </li>
          )}
        </>
      ))}
    </ul>
  );
}

export default function Services(props: { locationName: string }): JSX.Element {
  const { data, error, allServices, canLoadMore, loadMore } = useLiveServices(
    props.locationName
  );

  return (
    <div className="py-2 space-y-4">
      <Summary
        notFound={error?.code === 404}
        generatedAt={data?.generatedAt}
        messages={castArray(data?.nrccMessages || [])}
      />
      {!data && !error && <PlaceholderList />}
      <ServiceList items={allServices} />
      <div className="h-8">
        {canLoadMore && (
          <button
            className="w-full h-full rounded border hover:border-blue-500 font-semibold"
            onClick={loadMore}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
