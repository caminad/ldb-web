import { formatDistanceToNow, parseISO } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import castArray from 'lodash/castArray';
import useSWR from 'swr';
import RouteInfo from './route-info';
import ScheduleInfo from './schedule-info';

type OneOrMany<T> = T | T[];

interface Station {
  crs: string;
  locationName: string;
}

export interface Service {
  serviceID: string;
  origin: Station;
  destination: OneOrMany<Station & { via?: string }>;
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

function useLiveServices(crs: string) {
  const { data } = useSWR<
    Station & {
      generatedAt: string;
      nrccMessages?: OneOrMany<string>;
      trainServices?: OneOrMany<Service>;
    }
  >(`/api/services/${crs}?numRows=20`, {
    refreshInterval: 25000,
  });

  return data;
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
      <summary className="p-2 cursor-pointer font-marker rounded focus:outline-none">
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

export default function Services(props: { crs: string }): JSX.Element {
  const services = useLiveServices(props.crs);
  const distanceToNow = useDistanceToNow(services?.generatedAt);

  return (
    <div className="space-y-4">
      <span className="font-marker">
        {distanceToNow ? `Updated ${distanceToNow}` : `Loading...`}
      </span>
      {services?.nrccMessages && <Messages value={services.nrccMessages} />}
      <ul className="flex flex-col">
        {services?.trainServices &&
          castArray(services.trainServices).map((service) => (
            <li
              key={service.serviceID}
              className="py-2 border-t flex items-stretch space-x-4"
            >
              <ScheduleInfo className="w-40" {...service} />
              <RouteInfo className="w-full" {...service} />
            </li>
          ))}
      </ul>
    </div>
  );
}
