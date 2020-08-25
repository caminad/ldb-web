import Station, { encodeName } from 'models/Station';
import { useCallback, useState } from 'react';
import useSWR, { mutate } from 'swr';

const PAGE_SIZE = 20;

function count<T>(...items: (T | T[] | undefined)[]): number {
  return ([] as unknown[]).concat(...items.filter(Boolean)).length;
}

export default function useLiveServices(locationName: string | undefined) {
  const [limit, setLimit] = useState(PAGE_SIZE);
  const key = locationName
    ? `/api/stations/${encodeName(locationName)}?limit=${limit}`
    : null;

  const { data } = useSWR<Station>(key, {
    refreshInterval: 25000,
  });

  const loadMore = useCallback(async () => {
    const nextLimit = limit + PAGE_SIZE;

    // Populate the next page with the current results to preserve visible items.
    await mutate(
      `/api/stations/${encodeName(locationName)}?limit=${nextLimit}`,
      data
    );

    setLimit(nextLimit);
  }, [limit, locationName, data]);

  return [
    data,
    data && count(data.busServices, data.trainServices) === limit
      ? loadMore
      : undefined,
  ] as const;
}
