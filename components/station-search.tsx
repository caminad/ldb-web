import useStationSuggestions from 'hooks/use-station-suggestions';
import { encodeName } from 'models/station';
import SearchBox from './search-box';

export default function StationSearch(): JSX.Element {
  const [suggestions, setSearchTerm] = useStationSuggestions();

  return (
    <div className="flex flex-col justify-center items-center">
      <SearchBox
        label="Station Name"
        suggestions={suggestions}
        onValue={setSearchTerm}
        href="/stations/[name]"
        asPathFn={(value) => `/stations/${encodeName(value)}`}
      />
    </div>
  );
}
