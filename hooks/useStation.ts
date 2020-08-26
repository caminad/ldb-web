import Service from 'models/Service';
import Station, { encodeName } from 'models/Station';
import { DispatchWithoutAction, useReducer, useRef } from 'react';
import useSWR from 'swr';

const LIMIT_STEP = 20;

function countServices(...items: (Service | Service[] | undefined)[]): number {
  return ([] as unknown[]).concat(...items.filter(Boolean)).length;
}

function useDefined<T>(value: T | undefined): T | undefined {
  const ref = useRef(value);

  if (value !== undefined) {
    ref.current = value;
  }

  return ref.current;
}

export default function useStation(
  name: string
): [
  station: Station | undefined,
  raiseLimit: false | DispatchWithoutAction,
  isLoading: boolean
] {
  const [limit, raiseLimit] = useReducer((l) => l + LIMIT_STEP, LIMIT_STEP);

  const { data } = useSWR<Station>(
    `/api/stations/${encodeName(name)}?limit=${limit}`,
    { refreshInterval: 25000 }
  );

  const station = useDefined(data);

  const canRaiseLimit =
    countServices(station?.busServices, station?.trainServices) === limit;

  return [station, canRaiseLimit && raiseLimit, !data];
}
