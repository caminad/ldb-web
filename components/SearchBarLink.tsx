import { encodeName } from 'models/Station';
import Link from 'next/link';

export default function SearchBarLink({ name }: { name: string | null }) {
  return (
    <Link
      href={{
        pathname: '/stations',
        query: name && { search: encodeName(name) },
      }}
    >
      <a className="w-full h-12 border border-b-2 border-current p-2 rounded shadow flex flex-col justify-around font-medium focus:outline-none focus:text-blue-500">
        <span className="truncate">{name || 'Search Stations'}</span>
      </a>
    </Link>
  );
}
