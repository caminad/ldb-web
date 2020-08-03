import { format, formatDistanceToNow, parseISO } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import { ensureArray } from 'helpers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import AlterationReasons from './alteration-reasons';
import RouteInfo from './route-info';
import ScheduleInfo from './schedule-info';
import { StationLinkProps } from './station-link';

export interface ServicesProps {
  generatedAt: string;
  nrccMessages?: string | string[];
  trainServices?: Service | Service[];
}

export interface Service {
  serviceID: string;
  origin: StationLinkProps;
  destination: StationLinkProps | StationLinkProps[];
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

function useLiveServices(initialServices: StationLinkProps & ServicesProps) {
  const { data } = useSWR<StationLinkProps & ServicesProps>(
    `/api/services/${initialServices.crs}?numRows=20`,
    { refreshInterval: 30000 }
  );

  return data ?? initialServices;
}

function UpdatedTime(props: { dateString: string }) {
  const date = useMemo(() => parseISO(props.dateString), [props.dateString]);

  const formatDateToNow = useCallback(() => {
    return formatDistanceToNow(date, { addSuffix: true, locale: enGB });
  }, [date]);

  const [formatted, setFormatted] = useState(formatDateToNow);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormatted(formatDateToNow);
    }, 1000);

    return () => clearInterval(interval);
  }, [formatDateToNow, setFormatted]);

  return (
    <time
      className="font-marker"
      dateTime={props.dateString}
      title={format(date, 'PPp', { locale: enGB })}
    >
      Updated {formatted}
    </time>
  );
}

function Messages(props: { value: string[] | string }) {
  return (
    <details className="rounded border focus-within:shadow-outline transition-shadow duration-75">
      <summary className="p-2 cursor-pointer font-marker rounded focus:outline-none">
        Messages
      </summary>
      <ul className="p-2 font-casual space-y-2 border-t">
        {ensureArray(props.value).map((message, index) => (
          <li key={`${index}-${message}`} className="whitespace-pre-line">
            {message.replace(/<\/?.*?>/g, '')}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function Services(
  props: StationLinkProps & ServicesProps
): JSX.Element {
  const services = useLiveServices(props);

  return (
    <div className="space-y-4">
      <UpdatedTime dateString={services.generatedAt} />
      {services.nrccMessages && <Messages value={services.nrccMessages} />}
      <ul className="flex flex-col">
        {services.trainServices &&
          ensureArray(services.trainServices).map((service) => (
            <li
              key={service.serviceID}
              className="p-2 border-t flex items-stretch py-2 space-x-4"
            >
              <ScheduleInfo {...service} />
              <div className="flex flex-col justify-start w-full space-y-2">
                <RouteInfo {...service} />
                <AlterationReasons
                  value={[service.delayReason, service.cancelReason]}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
