import Station, { encodeName } from 'models/Station';
import { useCallback, useEffect, useState } from 'react';
import useSWR, { cache } from 'swr';

const LIMIT_STEP = 20;

function count<T>(...items: (T | T[] | undefined)[]): number {
  return ([] as unknown[]).concat(...items.filter(Boolean)).length;
}

function getKey(name: string | undefined, limit: number) {
  if (name) {
    return `/api/stations/${encodeName(name)}?limit=${limit}`;
  } else {
    return null;
  }
}

export default function useLiveServices(name: string | undefined) {
  const [limit, setLimit] = useState(LIMIT_STEP);

  const { data } = useSWR<Station>(getKey(name, limit), {
    refreshInterval: 25000,
  });

  const loadMore = useCallback(() => {
    setLimit((prevLimit) => {
      const nextLimit = prevLimit + LIMIT_STEP;

      // Populate the next page with the current results to preserve visible items.
      cache.set(getKey(name, nextLimit), data);

      return nextLimit;
    });
  }, [name, data]);

  useEffect(() => {
    // Reset limit on location change.
    setLimit(LIMIT_STEP);
  }, [name]);

  return [
    data,
    data && count(data.busServices, data.trainServices) === limit
      ? loadMore
      : undefined,
  ] as const;
}
