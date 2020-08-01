import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import StationLink, {StationLinkProps} from 'components/station-link'

function useStationSearch(search: string): StationLinkProps[] {
  const { data } = useSWR(() => {
    if (!search) throw new Error();
    return `/api/stations/${encodeURIComponent(search)}`;
  });
  return data ?? [];
}

export default function StationSearch() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const stations = useStationSearch(search);

  return (
    <form
      className="text-center"
      method="GET"
      onSubmit={(ev) => {
        ev.preventDefault();
        const station = stations[0];
        if (station) {
          router.push('/stations/[crs]', `/stations/${station.crs}`);
        }
      }}
    >
      <label className="text-xl">
        Show services via{' '}
        <input
          className="mx-4 px-4 py-2 border rounded shadow focus:border-blue-700"
          type="search"
          value={search}
          onChange={(ev) => setSearch(ev.currentTarget.value)}
        />
        <ul>
          {stations.map((item) => (
            <li className="my-2" key={item.crs}>
              <StationLink {...item}/>
            </li>
          ))}
        </ul>
      </label>
    </form>
  );
}
