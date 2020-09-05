import fuzzysort from 'fuzzysort';
import { useEffect, useMemo, useState } from 'react';

/**
 * Returns a list of station names matching the search term, and a function to update the search term.
 */
export default function useStationSuggestions(searchTerm: string): string[] {
  const [targets, setTargets] = useState<(Fuzzysort.Prepared | undefined)[]>(
    []
  );

  useEffect(() => {
    import('data/stations.json').then(({ default: stations }) => {
      setTargets(Object.keys(stations).map(fuzzysort.prepare));
    });
  }, []);

  const suggestions = useMemo(() => {
    const results = fuzzysort.go(searchTerm, targets, {
      limit: 10,
    });

    return results.map((result) => result.target);
  }, [searchTerm, targets]);

  return suggestions;
}
