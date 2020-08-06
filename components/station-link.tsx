import Link from 'next/link';

export default function StationLink(props: {
  children: string;
  via?: string;
  isCurrent: boolean;
}): JSX.Element {
  if (props.isCurrent) {
    return (
      <span>
        {props.children} {props.via}
      </span>
    );
  }

  return (
    <span>
      <Link
        href="/stations/[name]"
        as={`/stations/${encodeURIComponent(props.children)}`}
      >
        <a className="font-bold hover:underline">{props.children}</a>
      </Link>{' '}
      {props.via}
    </span>
  );
}
