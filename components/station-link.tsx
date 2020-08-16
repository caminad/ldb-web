import { encodeName } from 'models/station';
import Link from 'next/link';
import { preloadStationData } from './services';

export default function StationLink(props: {
  children: string;
  via?: string;
  isCurrent?: boolean;
}): JSX.Element {
  if (props.isCurrent) {
    return (
      <span>
        {props.children} {props.via}
      </span>
    );
  }

  return (
    <span
      onMouseEnter={() => preloadStationData(props.children)}
      onFocus={() => preloadStationData(props.children)}
    >
      <Link
        href="/stations/[name]"
        as={`/stations/${encodeName(props.children)}`}
      >
        <a className="font-bold hover:underline">{props.children}</a>
      </Link>{' '}
      {props.via}
    </span>
  );
}
