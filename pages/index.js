import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { data } = useSWR(
    () => {
      if (!search) throw new Error();
      return `/api/stations/${encodeURIComponent(search)}`;
    },
    async (key) => {
      const res = await fetch(key);
      return res.json();
    }
  );

  return (
    <div>
      <Head>
        <title>Unofficial National Rail Live Departure Boards</title>
      </Head>

      <main className="m-4">
        <h1 className="text-4xl text-center">
          Unofficial National Rail Live Departure Boards
        </h1>

        <form
          className="text-center"
          action={`/services/${search}`}
          method="GET"
          onSubmit={(ev) => {
            ev.preventDefault();
            const station = data?.[0];
            if (station) {
              router.push('/services/[crs]', `/services/${station.crs}`);
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
              {data?.map((item) => (
                <li className="my-2" key={item.crs}>
                  <Link href="/services/[crs]" as={`/services/${item.crs}`}>
                    <a className="font-bold hover:underline">
                      {item.locationName}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </label>
        </form>
      </main>
    </div>
  );
}
