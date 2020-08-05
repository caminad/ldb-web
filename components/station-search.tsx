import Router from 'next/router';
import React, { ChangeEventHandler, useState } from 'react';
import useSWR from 'swr';

export default function StationSearch(): JSX.Element {
  const [name, setName] = useState('');
  const { data: names = [] } = useSWR<string[]>(
    `/api/stations?q=${encodeURIComponent(name)}`
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.currentTarget.value);
  };

  return (
    <form
      className="flex justify-center"
      onSubmit={(event) => {
        event.preventDefault();
        Router.push(
          `/stations/[name]`,
          `/stations/${encodeURIComponent(name)}`
        );
      }}
    >
      <input
        className="max-w-full min-w-0 appearance-none px-6 py-3 rounded-lg rounded-r-none border-2 border-r-0 text-xl shadow-inner font-casual focus:outline-none focus:border-blue-600"
        type="search"
        name="station"
        list="stations"
        placeholder="Station Name"
        value={name}
        onChange={handleChange}
      />
      <datalist id="stations">
        {names.map((name) => (
          <option key={name}>{name}</option>
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
