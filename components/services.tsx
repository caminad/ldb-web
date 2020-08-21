import RouteInfo from 'components/route-info';
import ScheduleInfo from 'components/schedule-info';
import { formatDistanceToNow, parseISO } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import castArray from 'lodash/castArray';
import { encodeName } from 'models/station';
import Head from 'next/head';
import { useCallback, useState } from 'react';
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

const PAGE_SIZE = 10;

function useLiveServices(locationName: string) {
  const [limit, setLimit] = useState(PAGE_SIZE);

  const { data, error } = useSWR<Station>(
    locationName
      ? `/api/stations/${encodeName(locationName)}?limit=${limit}`
      : null,
    {
      refreshInterval: 25000,
    }
  );

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
    <details className="rounded border focus-within:shadow-outline transition-shadow duration-75">
      <summary className="p-2 cursor-pointer font-bold rounded focus:outline-none">
        Messages
      </summary>
      <ul className="p-2 font-casual space-y-2 border-t">
        {castArray(props.value).map((message, index) => (
          <li key={`${index}-${message}`} className="whitespace-pre-line">
            {message.replace(/<\/?.*?>/g, '')}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function Services(props: { locationName: string }): JSX.Element {
  const { data, error, allServices, canLoadMore, loadMore } = useLiveServices(
    props.locationName
  );

  const distanceToNow = useDistanceToNow(data?.generatedAt);

  if (error?.code === 404) {
    return (
      <div className="font-marker">
        <Head>
          <title>Not Found</title>
        </Head>
        Not Found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <span className="font-casual">
        {distanceToNow ? `Updated ${distanceToNow}` : `Loading...`}
      </span>
      {data?.nrccMessages && <Messages value={data.nrccMessages} />}
      <ul className="flex flex-col">
        {allServices.map((service) => (
          <li
            key={service.serviceID}
            className="py-2 border-t flex items-start space-x-4"
          >
            <ScheduleInfo
              className="w-40"
              {...service}
              platformAvailable={data?.platformAvailable}
            />
            <RouteInfo
              className="w-full"
              currentLocationName={props.locationName}
              {...service}
            />
          </li>
        ))}
      </ul>
      <div className="h-12">
        {canLoadMore && (
          <button
            className="w-full h-full rounded border hover:border-blue-600"
            onClick={loadMore}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
