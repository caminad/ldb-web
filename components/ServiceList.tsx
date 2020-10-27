import DetailWrapper from 'components/DetailWrapper';
import Operator from 'components/Operator';
import Platform from 'components/Platform';
import Reason from 'components/Reason';
import ServiceTime from 'components/ServiceTime';
import { ServiceItem } from 'generated/client';
import { encodeName } from 'models/Station';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';

// Fix for some external location names differing from the list used by this app.
function useCRSToLocationNameMap() {
  const [state, setState] = useState<Record<string, string>>({});

  useEffect(() => {
    import('data/stations.json').then(({ default: stations }) => {
      const result: Record<string, string> = {};
      for (const [locationName, crs] of Object.entries(stations)) {
        result[crs] = locationName;
      }
      setState(result);
    });
  }, []);

  return state;
}

export default function ServiceList(props: { items: ServiceItem[] }) {
  const crsToLocationNameMap = useCRSToLocationNameMap();

  return (
    <ul className="max-w-full flex flex-col space-y-2 overflow-x-auto">
      {props.items.map((service) => (
        <Fragment key={service.serviceID}>
          {service.sta && (
            <li className="flex flex-col">
              <DetailWrapper isCancelled={service.isCancelled}>
                <ServiceTime estimate={service.eta}>{service.sta}</ServiceTime>
                <Platform direction="in">{service.platform}</Platform>
                {service.origin?.map((origin) => (
                  <span key={origin.crs}>
                    <Link
                      href={`/stations/${encodeName(
                        crsToLocationNameMap[origin.crs] || origin.locationName
                      )}`}
                    >
                      <a className="inline-block font-semibold hover:underline hover:text-blue-500 focus:underline focus:text-blue-500">
                        {origin.locationName}
                      </a>
                    </Link>{' '}
                  </span>
                ))}
                <Operator>{service.operator}</Operator>
              </DetailWrapper>
              <Reason>{service.cancelReason || service.delayReason}</Reason>
            </li>
          )}
          {service.std && (
            <li className="flex flex-col">
              <DetailWrapper isCancelled={service.isCancelled}>
                <ServiceTime estimate={service.etd}>{service.std}</ServiceTime>
                <Platform direction="out">{service.platform}</Platform>
                {service.destination?.map((destination) => (
                  <span key={destination.crs}>
                    <Link
                      href={`/stations/${encodeName(
                        crsToLocationNameMap[destination.crs] ||
                          destination.locationName
                      )}`}
                    >
                      <a className="inline-block font-semibold hover:underline hover:text-blue-500 focus:underline focus:text-blue-500">
                        {destination.locationName}
                      </a>
                    </Link>{' '}
                    {destination.via}{' '}
                  </span>
                ))}
                <Operator>{service.operator}</Operator>
              </DetailWrapper>
              <Reason>{service.cancelReason || service.delayReason}</Reason>
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
}
