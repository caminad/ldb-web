import Service from 'models/Service';
import Station from 'models/Station';
import { DispatchWithoutAction, useReducer, useRef } from 'react';
import useSWR from 'swr';

const LIMIT_STEP = 20;

async function fetcher(crs: string, numRows: number) {
  const res = await fetch('https://ldb-graphql.vercel.app/api', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query ($crs: CRS!, $numRows: PositiveInt) {
        station(crs: $crs, numRows: $numRows) {
          crs
          locationName
          generatedAt
          nrccMessages
          platformAvailable
          trainServices {
            serviceID
            origin {
              crs
              locationName
            }
            destination {
              crs
              locationName
              via
            }
            operator
            sta
            eta
            std
            etd
            platform
            isCancelled
            delayReason
            cancelReason
          }
          busServices {
            serviceID
            origin {
              crs
              locationName
            }
            destination {
              crs
              locationName
              via
            }
            operator
            sta
            eta
            std
            etd
          }
        }
      }`,
      variables: { crs, numRows },
    }),
  });
  const { data, error } = await res.json();
  if (error) {
    throw error;
  }
  return data.station;
}

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
  crs: string
): [
  station: Station | undefined,
  raiseLimit: false | DispatchWithoutAction,
  isLoading: boolean
] {
  const [limit, raiseLimit] = useReducer(
    (l: number) => l + LIMIT_STEP,
    LIMIT_STEP
  );

  const { data } = useSWR<Station>([crs, limit], {
    fetcher,
    refreshInterval: 25000,
  });

  const station = useDefined(data);

  const canRaiseLimit =
    countServices(station?.busServices, station?.trainServices) === limit;

  return [station, canRaiseLimit && raiseLimit, !data];
}
