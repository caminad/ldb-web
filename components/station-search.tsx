import stationData from 'data/station_codes.json';
import Router from 'next/router';
import { ChangeEventHandler, useState } from 'react';

const collator = new Intl.Collator('en', {
  usage: 'search',
  sensitivity: 'base',
});

async function showStation(search: string) {
  for (const [name, crs] of stationData) {
    if (collator.compare(name, search) === 0) {
      await Router.push('/stations/[crs]', `/stations/${crs}`);
      return;
    }
  }
}

export default function StationSearch(): JSX.Element {
  const [search, setSearch] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.currentTarget.value);
  };

  return (
    <form
      className="flex justify-center"
      onSubmit={(event) => {
        event.preventDefault();
        showStation(search);
      }}
    >
      <input
        className="max-w-full min-w-0 appearance-none px-6 py-3 rounded-lg rounded-r-none border-2 border-r-0 text-xl shadow-inner font-casual focus:outline-none focus:border-blue-600"
        type="search"
        name="station"
        list="stations"
        placeholder="Station Name"
        value={search}
        onChange={handleChange}
      />
      <datalist id="stations">
        {stationData.map((station) => (
          <option key={station[1]}>{station[0]}</option>
        ))}
      </datalist>
      <button
        className="appearance-none px-6 py-3 rounded-lg rounded-l-none border-2 border-blue-600 bg-blue-600 text-xl text-white font-casual hover:shadow-lg"
        type="submit"
      >
        Show<span className="hidden sm:inline"> Services</span>
      </button>
    </form>
  );
}
