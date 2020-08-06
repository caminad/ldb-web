import useStationSuggestions from 'hooks/use-station-suggestions';
import { encodeName } from 'models/station';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SearchBox from './search-box';

export default function StationSearch(): JSX.Element {
  const router = useRouter();
  const [suggestions, setSearchTerm] = useStationSuggestions();
  const topSuggestion = suggestions[0];

  useEffect(() => {
    if (topSuggestion) {
      router.prefetch(
        `/stations/[name]`,
        `/stations/${encodeName(topSuggestion)}`
      );
    }
  }, [topSuggestion]);

  return (
    <div className="flex flex-col justify-center items-center">
      <SearchBox
        label="Station Name"
        suggestions={suggestions}
        onValue={setSearchTerm}
      />
    </div>
  );
}
