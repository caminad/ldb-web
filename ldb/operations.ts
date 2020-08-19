import stations from 'data/stations.json';
import { map } from 'fp-ts/lib/Either';
import { flow } from 'fp-ts/lib/function';
import * as t from 'io-ts';

const CRSCodes = new Set(Object.values(stations));

interface CRSBrand {
  readonly CRS: unique symbol;
}
const CRS = t.brand(
  t.string,
  (s): s is t.Branded<string, CRSBrand> => CRSCodes.has(s),
  'CRS'
);
const CRS_ = t.keyof(stations);
type CRS = t.Branded<string, CRSBrand>;

interface LimitBrand {
  readonly Limit: unique symbol;
}
const Limit = t.brand(
  t.Int,
  (n): n is t.Branded<t.Int, LimitBrand> => 0 < n,
  'Limit'
);
type Limit = t.TypeOf<typeof Limit>;

interface TimeOffsetBrand {
  readonly TimeOffset: unique symbol;
}
/**
 * A time offset that may be applied to the current time to give the base time for the departure board. The value could be negative if the client has suitable permission configured, otherwise the minimun value will be 0. If the client is not configured with suitable permission then upper bound will be 119.
 * Adapted from https://realtime.nationalrail.co.uk/OpenLDBWS/rtti_2017-10-01_ldb.wsdl
 */
const TimeOffset = t.brand(
  t.Int,
  (n): n is t.Branded<t.Int, TimeOffsetBrand> => n < 120,
  'TimeOffset'
);
type TimeOffset = t.TypeOf<typeof TimeOffset>;

interface TimeWindowBrand {
  readonly TimeWindow: unique symbol;
}
/**
 * The number of minutes added to the request start time to give the end time. The parameter default value is 120 minutes, if the supplied value is greater than 120 or not supplied. If the supplied pararmeter vaule is less than 0 then an error will return.
 * Adapted from https://realtime.nationalrail.co.uk/OpenLDBWS/rtti_2017-10-01_ldb.wsdl
 */
const TimeWindow = t.brand(
  t.Int,
  (n): n is t.Branded<t.Int, TimeWindowBrand> => 0 < n && n <= 120,
  'TimeWindow'
);
type TimeWindow = t.TypeOf<typeof TimeWindow>;

const BoardRequestParams = t.intersection([
  t.type({
    /**
     * The CRS code for the station departure board that is required.
     */
    crs: CRS,
  }),
  t.partial({
    /**
     * The maximum number of services that are required to be returned. This will be limited to a maximum value by the server, which may change according to system load or other factors. Only the minimum required number of services should be requested. For example, if only 10 services are displayed in a user interface, then this parameter should be set to 10.
     */
    numRows: Limit,
    /**
     * An optional CRS code that will filter the returned departure board. For example, if crs is set to "MAN", filterCRS is set to "EUS" and filterType is set to "to" then the departure board will return a list of services that depart Manchester Piccadilly and call at London Euston.
     */
    filterCrs: CRS,
    /**
     * The type of filter query that is required, either "from" or "to". This parameter is ignored unless filterCrs is also present.
     */
    filterType: t.keyof({ from: null, to: null }),
  }),
]);
type BoardRequestParams = t.TypeOf<typeof BoardRequestParams>;

const DeparturesRequestParams = t.intersection([
  t.type({
    /**
     * The CRS code for the station departure board that is required.
     */
    crs: CRS,
    /**
     * A list of CRS codes for the station destinations that are required. There must be at least one and may be no more than a maximum number of CRS codes in this list. The actual limit may vary and can be found in the documentation.
     */
    filterList: t.type({
      crs: t.union([CRS, t.array(CRS)]),
    }),
  }),
  t.partial({
    timeOffset: TimeOffset,
    timeWindow: TimeWindow,
  }),
]);
type DeparturesRequestParams = t.TypeOf<typeof DeparturesRequestParams>;

const ServiceRequestParams = t.type({
  /**
   * The service ID obtained from a departure board response for which full details are required. Note that service details are only available for a short time after a service has arrived/departed from the location in the departure board that the ID was obtained from.
   */
  serviceID: t.string,
});
type ServiceRequestParams = t.TypeOf<typeof ServiceRequestParams>;

const RequestBody = <K extends string, A>(
  key: K,
  paramsType: t.Decoder<unknown, A>
) => {
  return flow(
    paramsType.decode,
    map((params: unknown) => ({
      '@xmlns': 'http://thalesgroup.com/RTTI/2017-10-01/ldb/',
      [key]: params,
    }))
  );
};

export const Arrivals = RequestBody(
  'GetArrivalBoardRequest',
  BoardRequestParams
);
export const ArrivalsDetails = RequestBody(
  'GetArrBoardWithDetailsRequest',
  BoardRequestParams
);
export const Departures = RequestBody(
  'GetDepartureBoardRequest',
  BoardRequestParams
);
export const DeparturesDetails = RequestBody(
  'GetDepBoardWithDetailsRequest',
  BoardRequestParams
);
export const ArrivalsDepartures = RequestBody(
  'GetArrivalDepartureBoardRequest',
  BoardRequestParams
);
export const ArrivalsDeparturesDetails = RequestBody(
  'GetArrDepBoardWithDetailsRequest',
  BoardRequestParams
);

export const NextDepartures = RequestBody(
  'GetNextDeparturesRequest',
  DeparturesRequestParams
);
export const NextDeparturesDetails = RequestBody(
  'GetNextDeparturesWithDetailsRequest',
  DeparturesRequestParams
);
export const FastestDepartures = RequestBody(
  'GetFastestDeparturesRequest',
  DeparturesRequestParams
);
export const FastestDeparturesDetails = RequestBody(
  'GetFastestDeparturesWithDetailsRequest',
  DeparturesRequestParams
);

export const Service = RequestBody(
  'GetServiceDetailsRequest',
  ServiceRequestParams
);
