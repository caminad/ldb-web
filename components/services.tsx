import { formatDistanceToNow, parseISO } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import StationLink, { StationLinkProps } from './station-link';

export interface ServicesProps {
  generatedAt: string;
  nrccMessages?: string | string[];
  trainServices?: Service | Service[];
}

export interface Service {
  serviceID: string;
  origin?: StationLinkProps;
  destination?: StationLinkProps;
  sta?: string;
  eta?: string;
  std?: string;
  etd?: string;
  platform?: string;
  operator?: string;
}

function useLiveServices(
  initialServices: StationLinkProps & ServicesProps
): StationLinkProps & ServicesProps {
  const { data } = useSWR<StationLinkProps & ServicesProps>(
    `/api/services/${initialServices.crs}?numRows=50`,
    {
      refreshInterval: 15000,
    }
  );

  return data ?? initialServices;
}

function TimeToNow(props: { dateString: string }): JSX.Element {
  const date = useMemo(() => parseISO(props.dateString), [props.dateString]);

  const format = useCallback(() => {
    return formatDistanceToNow(date, { addSuffix: true });
  }, [date]);

  const [formatted, setFormatted] = useState(format);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormatted(format);
    }, 1000);

    return () => clearInterval(interval);
  }, [format, setFormatted]);

  return (
    <time dateTime={props.dateString} title={props.dateString}>
      {formatted}
    </time>
  );
}

function UpdatedTime(props: { dateString: string | undefined }): JSX.Element {
  if (!props.dateString) {
    return <p>Loading...</p>;
  }
  return (
    <p>
      Updated <TimeToNow dateString={props.dateString} />.
    </p>
  );
}

function Messages(props: { list: string[] }): JSX.Element {
  if (props.list.length === 0) {
    return <p>No Service Messages for this station</p>;
  }
  return (
    <details>
      <summary>Service Messages</summary>
      <article className="prose">
        <ul>
          {props.list.map((message) => (
            <li key={message}>
              {message
                .replace(/<\/?.*?>/g, '')
                .split('\n')
                .map((para) => (
                  <p key={para}>{para}</p>
                ))}
            </li>
          ))}
        </ul>
      </article>
    </details>
  );
}

function ServiceTime(props: { scheduled?: string; estimated?: string }) {
  return (
    <>
      {props.estimated === 'On time' ? (
        props.scheduled
      ) : (
        <span>
          <s>{props.scheduled}</s> {props.estimated}
        </span>
      )}
    </>
  );
}

function ensureArray<T>(value: T[] | T | undefined): T[] {
  if (Array.isArray(value)) {
    return value;
  } else if (value) {
    return [value];
  } else {
    return [];
  }
}

export default function Services(
  props: StationLinkProps & ServicesProps
): JSX.Element {
  const services = useLiveServices(props);

  return (
    <>
      <UpdatedTime dateString={services.generatedAt} />
      <Messages list={ensureArray(services.nrccMessages)} />
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 w-1/8">Arrives</th>
            <th className="px-4 py-2 w-1/8">Departs</th>
            <th className="px-4 py-2 w-1/8">Platform</th>
            <th className="px-4 py-2">Service</th>
          </tr>
        </thead>
        <tbody>
          {ensureArray(services.trainServices).map((service) => (
            <tr key={service.serviceID}>
              <td className="px-4 py-2 text-center">
                <ServiceTime scheduled={service.sta} estimated={service.eta} />
              </td>
              <td className="px-4 py-2 text-center">
                <ServiceTime scheduled={service.std} estimated={service.etd} />
              </td>
              <td className="px-4 py-2 text-center">{service.platform}</td>
              <td className="px-4 py-2">
                {service.origin && <StationLink {...service.origin} />}
                {' to '}
                {service.destination && (
                  <StationLink {...service.destination} />
                )}
                {' — '}
                {service.operator}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
