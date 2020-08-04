import Link from 'next/link';
import { useRouter } from 'next/router';

export default function StationLink(props: {
  crs: string;
  locationName: string;
  via?: string;
}): JSX.Element {
  const router = useRouter();

  if (router.asPath !== `/stations/${props.crs}`) {
    return (
      <span>
        <Link href="/stations/[crs]" as={`/stations/${props.crs}`}>
          <a className="font-bold hover:underline">{props.locationName}</a>
        </Link>{' '}
        {props.via}
      </span>
    );
  }
  return (
    <span>
      {props.locationName} {props.via}
    </span>
  );
}
