import clsx from 'clsx';
import castArray from 'lodash/castArray';
import { Fragment } from 'react';
import { Service } from './services';
import StationLink from './station-link';

export default function RouteInfo(
  props: Service & { className?: string }
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
        <StationLink {...props.origin} />
        {castArray(props.destination).map((destination) => (
          <Fragment key={destination.crs}>
            {' '}
            to <StationLink {...destination} />
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
