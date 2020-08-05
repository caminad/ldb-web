import Link from 'next/link';
import { useRouter } from 'next/router';

export default function StationLink(props: {
  children: string;
  via?: string;
}): JSX.Element {
  const router = useRouter();

  const asPath = `/stations/${encodeURIComponent(props.children)}`;

  if (router.asPath !== asPath) {
    return (
      <span>
        <Link href="/stations/[name]" as={asPath}>
          <a className="font-bold hover:underline">{props.children}</a>
        </Link>{' '}
        {props.via}
      </span>
    );
  }
  return (
    <span>
      {props.children} {props.via}
    </span>
  );
}
