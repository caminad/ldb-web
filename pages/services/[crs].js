import { formatDistanceToNow, parseISO } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/**
 *
 * @param {{ dateString: string }} props
 */
function TimeToNow(props) {
  const date = useMemo(() => parseISO(props.dateString), [props.dateString]);

  const format = useCallback(() => {
    return formatDistanceToNow(date, { addSuffix: true });
  }, [date]);

  const [formatted, setFormatted] = useState(format);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormatted(format);
    });

    return () => {
      clearInterval(interval);
    };
  }, [format, setFormatted]);

  return (
    <time dateTime={props.dateString} title={props.dateString}>
      {formatted}
    </time>
  );
}

export default function Service() {
  const router = useRouter();

  const { data, error } = useSWR(
    () => {
      return `/api/services/${encodeURIComponent(
        // @ts-expect-error -- .toUpperCase() may not exist
        router.query.crs.toUpperCase()
      )}`;
    },
    async (key) => {
      const res = await fetch(key);
      return await res.json();
    },
    { refreshInterval: 15000 }
  );

  if (!data && !error) {
    return (
      <div>
        <Head>
          <title>Loading...</title>
        </Head>
      </div>
    );
  }

  if (error) {
    router.replace('/');
    return (
      <div>
        <Head>
          <title>Not Found</title>
        </Head>
        Not Found
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Services via {data.locationName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-4">
        <h1 className="text-4xl font-bold mb-4">
          Services via {data.locationName}
        </h1>
        <p>
          Updated <TimeToNow dateString={data.generatedAt} />.
        </p>
        {data.nrccMessages && (
          <details>
            <summary>Service Messages</summary>
            <article className="prose">
              <ul>
                {[].concat(data.nrccMessages).map((message) => (
                  <li key={message}>
                    {message
                      .replace(/\&lt;.*?\&gt;/g, '')
                      .replace(/\&(?:amp;)+/g, '&')
                      .split('\n')
                      .map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                  </li>
                ))}
              </ul>
            </article>
          </details>
        )}
        <table className="table-auto text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Origin</th>
              <th className="px-4 py-2">Destination</th>
              <th className="px-4 py-2">Arrives</th>
              <th className="px-4 py-2">Departs</th>
              <th className="px-4 py-2">Platform</th>
              <th className="px-4 py-2">Operator</th>
            </tr>
          </thead>
          <tbody>
            {[].concat(data.trainServices).map((service) => (
              <tr key={service.serviceID}>
                <td className="border px-4 py-2">
                  <Link
                    href="/services/[crs]"
                    as={`/services/${service.origin.crs}`}
                  >
                    <a className="font-bold hover:underline">
                      {service.origin.locationName}
                    </a>
                  </Link>{' '}
                  {service.origin.via}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/services/[crs]"
                    as={`/services/${service.destination.crs}`}
                  >
                    <a className="font-bold hover:underline">
                      {service.destination.locationName}
                    </a>
                  </Link>{' '}
                  {service.destination.via}
                </td>
                <td className="border px-4 py-2">
                  {service.eta === 'On time' ? (
                    service.sta
                  ) : (
                    <span>
                      <s>{service.sta}</s> {service.eta}
                    </span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {service.etd === 'On time' ? (
                    service.std
                  ) : (
                    <span>
                      <s>{service.std}</s> {service.etd}
                    </span>
                  )}
                </td>
                <td className="border px-4 py-2">{service.platform}</td>
                <td className="border px-4 py-2">{service.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
