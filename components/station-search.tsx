import stations from 'data/station_codes.json';
import { useRouter } from 'next/router';
import { ChangeEventHandler, useMemo, useState } from 'react';

const collator = new Intl.Collator('en', {
  usage: 'search',
  sensitivity: 'base',
});

function findStation(search: string) {
  return stations.find((item) => {
    return collator.compare(item.locationName, search) === 0;
  });
}

export default function StationSearch(): JSX.Element {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const station = useMemo(() => {
    return findStation(search);
  }, [search]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.currentTarget.value);
  };

  return (
    <form
      className="my-32 flex justify-center"
      onSubmit={(event) => {
        event.preventDefault();
        if (station) {
          router.push('/stations/[crs]', `/stations/${station.crs}`);
        }
      }}
    >
      <input
        className="max-w-full min-w-0 appearance-none px-6 py-3 rounded-lg rounded-r-none border-2 border-r-0 text-xl shadow-inner focus:outline-none focus:border-blue-600"
        type="search"
        name="station"
        list="stations"
        placeholder="Station Name"
        value={search}
        onChange={handleChange}
      />
      <datalist id="stations">
        {stations.map((station) => (
          <option key={station.crs}>{station.locationName}</option>
        ))}
      </datalist>
      <button
        className="appearance-none px-6 py-3 rounded-lg rounded-l-none border-2 border-blue-600 bg-blue-600 text-xl text-white hover:shadow-lg"
        type="submit"
      >
        Show<span className="hidden sm:inline"> Services</span>
      </button>
    </form>
  );
}
