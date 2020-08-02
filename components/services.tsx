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
  isCancelled?: boolean;
  delayReason?: string;
  cancelReason?: string;
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

function ValuePlaceholder() {
  return <span className="opacity-50 font-sans">&mdash;</span>;
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

function UpdatedTime(props: { dateString: string }): JSX.Element {
  return (
    <p className="font-marker">
      Updated <TimeToNow dateString={props.dateString} />
    </p>
  );
}

function Messages(props: { list: string[] }): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  if (props.list.length === 0) {
    return <></>;
  }

  return (
    <ul
      className={`font-casual space-y-2${
        expanded ? '' : ' p-2 overflow-y-hidden h-16 shadow-inner rounded'
      }`}
      onClick={() => setExpanded((state) => !state)}
    >
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
  );
}

function ServiceTime(props: {
  label: string;
  scheduled?: string;
  estimated?: string;
}) {
  if (!props.scheduled) {
    return <ValuePlaceholder />;
  }
  return (
    <div className="text-sm">
      <span className="text-xs font-light">{props.label}</span>{' '}
      {props.estimated === 'On time' ? (
        props.scheduled
      ) : (
        <>
          <del className="line-through">{props.scheduled}</del>
          <br />
          <ins className="font-marker">{props.estimated}</ins>
        </>
      )}
    </div>
  );
}

function ServicePlatform(props: { value?: string }) {
  if (!props.value) {
    return <ValuePlaceholder />;
  }
  return (
    <div className="text-sm">
      <span className="text-xs font-light">platform</span>{' '}
      <span className="font-casual">{props.value}</span>
    </div>
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
    <div className="space-y-4">
      <UpdatedTime dateString={services.generatedAt} />
      <Messages list={ensureArray(services.nrccMessages)} />
      <div className="flex flex-col">
        {ensureArray(services.trainServices).map((service) => (
          <div className="py-3 space-y-2 border-t" key={service.serviceID}>
            <p className={service.isCancelled ? 'line-through' : undefined}>
              {service.origin && <StationLink {...service.origin} />}
              {ensureArray(service.destination).map((destination) => (
                <span key={destination.crs}>
                  {' '}
                  to <StationLink {...destination} />
                </span>
              ))}{' '}
              <span className="font-light">({service.operator})</span>
            </p>
            {service.delayReason && (
              <p className="font-casual">
                {service.isCancelled ? (
                  <del className="line-through">{service.delayReason}</del>
                ) : (
                  <span>{service.delayReason}</span>
                )}
              </p>
            )}
            {service.cancelReason && (
              <p className="font-casual">{service.cancelReason}</p>
            )}
            <div className="grid grid-cols-3 text-center">
              <ServiceTime
                label="arrives"
                scheduled={service.sta}
                estimated={service.eta}
              />
              <ServicePlatform value={service.platform} />
              <ServiceTime
                label="departs"
                scheduled={service.std}
                estimated={service.etd}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
