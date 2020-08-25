import { encodeName } from 'models/Station';
import Link from 'next/link';

export default function Location(props: { children: string }) {
  return (
    <Link
      href="/stations/[name]"
      as={`/stations/${encodeName(props.children)}`}
    >
      <a className="inline-block font-semibold hover:underline hover:text-blue-500 focus:underline focus:text-blue-500">
        {props.children}
      </a>
    </Link>
  );
}
