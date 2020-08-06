import fuzzysort from 'fuzzysort';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import useSWR from 'swr';

/**
 * Returns a list of station names matching the search term, and a function to update the search term.
 * Stale data is returned until the current request has completed.
 */
export default function useStationSuggestions(): [
  string[],
  Dispatch<SetStateAction<string>>
] {
  const { data: stations = [] } = useSWR(`/api/stations`);
  const [searchTerm, setSearchTerm] = useState('');

  const targets = useMemo(() => {
    return stations.map(fuzzysort.prepare);
  }, [stations]);

  const suggestions = useMemo(() => {
    const results = fuzzysort.go(searchTerm, targets, { limit: 10 });
    return results.map((result) => result.target);
  }, [searchTerm, targets]);

  return [suggestions, setSearchTerm];
}
