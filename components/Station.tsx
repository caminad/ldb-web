import PlaceholderList from 'components/PlaceholderList';
import PoweredByNationalRailEnquiries from 'components/PoweredByNationalRailEnquiries';
import ServiceList from 'components/ServiceList';
import Summary from 'components/Summary';
import useDistanceToNow from 'hooks/useDistanceToNow';
import useStation from 'hooks/useStation';
import castArray from 'lodash/castArray';

export default function Station({ name }: { name: string }) {
  const [station, raiseLimit, isLoading] = useStation(name);

  const distanceToNow = useDistanceToNow(station?.generatedAt);

  return (
    <div className="py-2 space-y-4">
      <Summary messages={station ? station.nrccMessages : []}>
        <span className="inline-block font-extrabold">
          Live Arrivals and Departures
        </span>{' '}
        <span className="inline-block text-gray-700 text-sm">
          {distanceToNow && `updated ${distanceToNow}`}
        </span>
      </Summary>

      {station?.busServices && (
        <ServiceList
          items={castArray(station.busServices).map((service) => ({
            ...service,
            platform: 'bus',
          }))}
        />
      )}

      {station?.trainServices && (
        <ServiceList items={castArray(station.trainServices)} />
      )}

      {isLoading && <PlaceholderList />}

      <div className="h-8">
        {raiseLimit && (
          <button
            className="w-full h-full rounded border hover:border-blue-500 font-semibold"
            onClick={raiseLimit}
          >
            Show more
          </button>
        )}
      </div>

      <PoweredByNationalRailEnquiries />
    </div>
  );
}
