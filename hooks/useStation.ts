import {
  createClient,
  everything,
  GetStationBoardResult,
  Scalars,
  ServiceItem,
} from 'generated/client';
import { DispatchWithoutAction, useReducer, useRef } from 'react';
import useSWR from 'swr';

const LIMIT_STEP = 20;

const client = createClient();

async function fetcher(crs: Scalars['CRS'], numRows: Scalars['PositiveInt']) {
  const { station } = await client.query({
    station: [
      { crs, numRows },
      {
        ...everything,
        trainServices: {
          ...everything,
          origin: { ...everything },
          destination: { ...everything },
        },
        busServices: {
          ...everything,
          origin: { ...everything },
          destination: { ...everything },
        },
        ferryServices: {
          ...everything,
          origin: { ...everything },
          destination: { ...everything },
        },
      },
    ],
  });

  return station;
}

function allServices(station: GetStationBoardResult) {
  return ([] as ServiceItem[]).concat(
    station.trainServices || [],
    station.busServices || [],
    station.ferryServices || []
  );
}

function useDefined<T>(value: T | undefined): T | undefined {
  const ref = useRef(value);

  if (value !== undefined) {
    ref.current = value;
  }

  return ref.current;
}

export default function useStation(
  crs: string
): [
  station: GetStationBoardResult | undefined,
  raiseLimit: false | DispatchWithoutAction,
  isLoading: boolean
] {
  const [limit, raiseLimit] = useReducer(
    (l: number) => l + LIMIT_STEP,
    LIMIT_STEP
  );

  const { data } = useSWR([crs, limit], fetcher, {
    refreshInterval: 25000,
  });

  const station = useDefined(data);

  const canRaiseLimit = station ? allServices(station).length === limit : false;

  return [station, canRaiseLimit && raiseLimit, !data];
}
