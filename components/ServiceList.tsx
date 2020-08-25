import DetailWrapper from 'components/DetailWrapper';
import Location from 'components/Location';
import Operator from 'components/Operator';
import Platform from 'components/Platform';
import Reason from 'components/Reason';
import ServiceTime from 'components/ServiceTime';
import castArray from 'lodash/castArray';
import Service from 'models/Service';
import { Fragment } from 'react';

export default function ServiceList(props: { items: Service[] }) {
  return (
    <ul className="max-w-full flex flex-col space-y-2 overflow-x-auto">
      {props.items.map((service) => (
        <Fragment key={service.serviceID}>
          {service.sta && service.origin?.locationName && (
            <li className="flex flex-col">
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
            <li className="flex flex-col">
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
        </Fragment>
      ))}
    </ul>
  );
}
