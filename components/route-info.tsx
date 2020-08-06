import clsx from 'clsx';
import { Service } from 'components/services';
import StationLink from 'components/station-link';
import castArray from 'lodash/castArray';
import { Fragment } from 'react';

export default function RouteInfo(
  props: Service & { className?: string; currentLocationName: string }
): JSX.Element {
  return (
    <div
      className={clsx('flex flex-col justify-start space-y-2', props.className)}
    >
      <p
        className={clsx({
          'line-through opacity-50': props.isCancelled,
        })}
      >
        <StationLink
          isCurrent={props.currentLocationName === props.origin.locationName}
        >
          {props.origin.locationName}
        </StationLink>
        {castArray(props.destination).map((destination) => (
          <Fragment key={destination.locationName}>
            {' to '}
            <StationLink
              via={destination.via}
              isCurrent={props.currentLocationName === destination.locationName}
            >
              {destination.locationName}
            </StationLink>
          </Fragment>
        ))}
      </p>
      <p
        className={clsx('block uppercase text-xs leading-tight', {
          'line-through opacity-50': props.isCancelled,
        })}
      >
        {props.operator}
      </p>
      {props.delayReason && (
        <p
          className={clsx('font-casual', {
            'line-through opacity-50': props.cancelReason,
          })}
        >
          {props.delayReason}
        </p>
      )}
      {props.cancelReason && (
        <p className="font-casual">{props.cancelReason}</p>
      )}
    </div>
  );
}
