import { encodeName } from 'models/station';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';

/**
 * Returns a list of station names matching the search term.
 * Stale data is returned until the current request has completed.
 */
export default function useStationSuggestions(): [suggestions: string[], setSearchTerm: Dispatch<SetStateAction<string>>] {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setNames] = useState<string[]>([]);
  const { data } = useSWR<string[]>(
    `/api/stations?q=${encodeName(searchTerm)}`
  );

  useEffect(() => {
    if (data) {
      setNames(data);
    }
  }, [data]);

  return [suggestions, setSearchTerm];
}
