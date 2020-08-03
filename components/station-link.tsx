import Link from 'next/link';
import { useRouter } from 'next/router';

export interface StationLinkProps {
  crs: string;
  locationName: string;
  via?: string;
}

export default function StationLink(props: StationLinkProps): JSX.Element {
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
