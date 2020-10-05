import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    DateTime: any,
    String: string,
    CRS: any,
    Boolean: boolean,
    Int: number,
    PositiveInt: any,
    TimeOffset: any,
    TimeWindow: any,
}

export interface Query {
    /** Returns all public arrivals and departures for the supplied CRS code within a defined time window. See <https://realtime.nationalrail.co.uk/OpenLDBWS/#GetArrivalDepartureBoardHeader> */
    station: GetStationBoardResult
    __typename?: 'Query'
}

export interface GetStationBoardResult {
    /** The time at which the station board was generated. */
    generatedAt: Scalars['DateTime']
    /** The name of the location that the station board is for. */
    locationName: Scalars['String']
    /** The CRS code of the location that the station board is for. */
    crs: Scalars['CRS']
    /** If a filter was requested, the location name of the filter location. */
    filterLocationName?: Scalars['String']
    /** If a filter was requested, the CRS code of the filter location. */
    filtercrs?: Scalars['String']
    /** If a filter was requested, the type of filter. */
    filterType?: FilterType
    /** An optional list of textual messages that should be displayed with the station board. The message may include embedded and xml encoded HTML-like hyperlinks and paragraphs. The messages are typically used to display important disruption information that applies to the location that the station board was for. Any embedded <p> tags are used to force a new-line in the output. Embedded <a> tags allow links to external web pages that may provide more information. Output channels that do not support HTML should strip out the <a> tags and just leave the enclosed text. */
    nrccMessages?: Scalars['String'][]
    /** An optional value that indicates if platform information is available. If this value is present with the value `true` then platform information will be returned in the service lists. If this value is not present, or has the value `false`, then the platform "heading" should be suppressed in the user interface for this station board. */
    platformAvailable: Scalars['Boolean']
    /** An optional value that indicates if services are currently available for this station board. If this value is present with the value `false` then no services will be returned in the service lists. This value may be set, for example, if access to a station has been closed to the public at short notice, even though the scheduled services are still running. It would be usual in such cases for one of the nrccMessages to describe why the list of services has been suppressed. */
    areServicesAvailable: Scalars['Boolean']
    /** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
    trainServices?: ServiceItem[]
    /** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
    busServices?: ServiceItem[]
    /** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
    ferryServices?: ServiceItem[]
    __typename?: 'GetStationBoardResult'
}

export type FilterType = 'from' | 'to'

export interface ServiceItem {
    /** An optional Scheduled Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards but may also not be present at locations that are not scheduled to arrive at the location (e.g. the origin). */
    sta?: Scalars['String']
    /** An optional Estimated Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards and only where an sta time is present. */
    eta?: Scalars['String']
    /** An optional Scheduled Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards but may also not be present at locations that are not scheduled to depart at the location (e.g. the destination). */
    std?: Scalars['String']
    /** An optional Estimated Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards and only where an std time is present. */
    etd?: Scalars['String']
    /** An optional platform number for the service at this location. This will only be present where available and where the station board platformAvailable value is `true`. */
    platform?: Scalars['String']
    /** The name of the Train Operating Company that operates the service. */
    operator: Scalars['String']
    /** The code of the Train Operating Company that operates the service. */
    operatorCode: Scalars['String']
    /** If this value is present and has the value `true` then the service is operating on a circular route through the network and will call again at this location later on its journey. The user interface should indicate this fact to the user, to help them choose the correct service from a set of similar alternatives. */
    isCircularRoute: Scalars['Boolean']
    /** A flag to indicate that this service is cancelled at this location. */
    isCancelled: Scalars['Boolean']
    /** A flag to indicate that this service is no longer stopping at the requested from/to filter location. */
    filterLocationCancelled: Scalars['Boolean']
    /** The type of service (train, bus, ferry) that this item represents. Note that real-time information (e.g. eta, etd, ata, atd, isCancelled, etc.) is only available and present for train services. */
    serviceType?: Scalars['String']
    /** The train length (number of units) at this location. If not supplied, or zero, the length is unknown. */
    length?: Scalars['Int']
    /** True if the service detaches units from the front at this location. */
    detachFront: Scalars['Boolean']
    /** True if the service is operating in the reverse of its normal formation. */
    isReverseFormation: Scalars['Boolean']
    /** A cancellation reason for this service. */
    cancelReason?: Scalars['String']
    /** A delay reason for this service. */
    delayReason?: Scalars['String']
    /** A list of Adhoc Alerts related to this location for this service. This list contains an object called `AdhocAlertTextType` which contains a string to show the Adhoc Alert Text for the location. */
    adhocAlerts?: Scalars['String']
    /** The unique service identifier of this service relative to the station board on which it is displayed. This value can be passed to GetServiceDetails to obtain the full details of the individual service. */
    serviceID: Scalars['String']
    /** The Retail Service ID of the service, if known. */
    rsid?: Scalars['String']
    /** A list of `ServiceLocation` objects giving original origins of this service. Note that a service may have more than one original origin, if the service comprises of multiple trains that join at a previous location in the schedule. Original Origins will only be available for Arrival and Arrival & Departure station boards. */
    origin?: ServiceLocation[]
    /** A list of `ServiceLocation` objects giving original destinations of this service. Note that a service may have more than one original destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Original Destinations will only be available for Departure and Arrival & Departure station boards. */
    destination?: ServiceLocation[]
    /** An optional list of `ServiceLocation` objects giving live/current origins of this service which is not starting at original cancelled origins. Note that a service may have more than one live origin. if the service comprises of multiple trains that join at a previous location in the schedule. Live Origins will only be available for Arrival and Arrival & Departure station boards. */
    currentOrigins?: ServiceLocation[]
    /** An optional list of `ServiceLocation` objects giving live/current destinations of this service which is not ending at original cancelled destinations. Note that a service may have more than one live destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Live Destinations will only be available for Departure and Arrival & Departure station boards. */
    currentDestinations?: ServiceLocation[]
    /** FormationData for this ServiceItem, if any. */
    formation?: FormationData
    __typename?: 'ServiceItem'
}

export interface ServiceLocation {
    /** The name of the location. */
    locationName: Scalars['String']
    /** The CRS code of this location. A CRS code of ??? indicates an error situation where no crs code is known for this location. */
    crs: Scalars['CRS']
    /** An optional via text that should be displayed after the location, to indicate further information about an ambiguous route. Note that vias are only present for ServiceLocation objects that appear in destination lists. */
    via?: Scalars['String']
    /** A text string contianing service type (Bus/Ferry/Train) to which will be changed in the future. */
    futureChangeTo?: Scalars['String']
    /** This origin or destination can no longer be reached because the association has been cancelled. */
    assocIsCancelled: Scalars['Boolean']
    __typename?: 'ServiceLocation'
}

export interface FormationData {
    /** The average loading value for this formation. */
    avgLoading: Scalars['Int']
    /** A collection of CoachData objects related to this formation. */
    coaches: CoachData[]
    __typename?: 'FormationData'
}

export interface CoachData {
    /** The class of coach, where known. First, Mixed or Standard. Other classes may be introduced in the future. */
    coachClass: Scalars['String']
    /** The loading value (0-100) for the coach. */
    loading: Scalars['Int']
    /** The number/identifier for this coach, e.g. "A" or "12". Maximum of two characters. */
    number: Scalars['String']
    /** A ToiletAvailabilityType object representing toilet data. (2017-10-01 schema onwards) */
    toilet: ToiletAvailabilityType
    __typename?: 'CoachData'
}

export interface ToiletAvailabilityType {
    /** ToiletStatus enumeration (Unknown, InService, NotInService), indicating service status */
    status?: ToiletStatus
    /** Type of toilet (Unknown, None, Standard, Accessible) */
    value?: ToiletType
    __typename?: 'ToiletAvailabilityType'
}

export type ToiletStatus = 'Unknown' | 'InService' | 'NotInService'

export type ToiletType = 'Unknown' | 'None' | 'Standard' | 'Accessible'

export interface QueryRequest{
    /** Returns all public arrivals and departures for the supplied CRS code within a defined time window. See <https://realtime.nationalrail.co.uk/OpenLDBWS/#GetArrivalDepartureBoardHeader> */
    station?: [{
    /** The CRS code of the location for which the request is being made. */
    crs: Scalars['CRS'],
    /** The number of services to return in the resulting station board. */
    numRows?: (Scalars['PositiveInt'] | null),
    /** The CRS code of either an origin or destination location to filter in. */
    filterCrs?: (Scalars['CRS'] | null),
    /** The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to". */
    filterType?: (FilterType | null),
    /** An offset in minutes against the current time to provide the station board for. Defaults to 0. */
    timeOffset?: (Scalars['TimeOffset'] | null),
    /** How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. */
    timeWindow?: (Scalars['TimeWindow'] | null)},GetStationBoardResultRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GetStationBoardResultRequest{
    /** The time at which the station board was generated. */
    generatedAt?: boolean | number
    /** The name of the location that the station board is for. */
    locationName?: boolean | number
    /** The CRS code of the location that the station board is for. */
    crs?: boolean | number
    /** If a filter was requested, the location name of the filter location. */
    filterLocationName?: boolean | number
    /** If a filter was requested, the CRS code of the filter location. */
    filtercrs?: boolean | number
    /** If a filter was requested, the type of filter. */
    filterType?: boolean | number
    /** An optional list of textual messages that should be displayed with the station board. The message may include embedded and xml encoded HTML-like hyperlinks and paragraphs. The messages are typically used to display important disruption information that applies to the location that the station board was for. Any embedded <p> tags are used to force a new-line in the output. Embedded <a> tags allow links to external web pages that may provide more information. Output channels that do not support HTML should strip out the <a> tags and just leave the enclosed text. */
    nrccMessages?: boolean | number
    /** An optional value that indicates if platform information is available. If this value is present with the value `true` then platform information will be returned in the service lists. If this value is not present, or has the value `false`, then the platform "heading" should be suppressed in the user interface for this station board. */
    platformAvailable?: boolean | number
    /** An optional value that indicates if services are currently available for this station board. If this value is present with the value `false` then no services will be returned in the service lists. This value may be set, for example, if access to a station has been closed to the public at short notice, even though the scheduled services are still running. It would be usual in such cases for one of the nrccMessages to describe why the list of services has been suppressed. */
    areServicesAvailable?: boolean | number
    /** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
    trainServices?: ServiceItemRequest
    /** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
    busServices?: ServiceItemRequest
    /** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
    ferryServices?: ServiceItemRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ServiceItemRequest{
    /** An optional Scheduled Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards but may also not be present at locations that are not scheduled to arrive at the location (e.g. the origin). */
    sta?: boolean | number
    /** An optional Estimated Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards and only where an sta time is present. */
    eta?: boolean | number
    /** An optional Scheduled Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards but may also not be present at locations that are not scheduled to depart at the location (e.g. the destination). */
    std?: boolean | number
    /** An optional Estimated Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards and only where an std time is present. */
    etd?: boolean | number
    /** An optional platform number for the service at this location. This will only be present where available and where the station board platformAvailable value is `true`. */
    platform?: boolean | number
    /** The name of the Train Operating Company that operates the service. */
    operator?: boolean | number
    /** The code of the Train Operating Company that operates the service. */
    operatorCode?: boolean | number
    /** If this value is present and has the value `true` then the service is operating on a circular route through the network and will call again at this location later on its journey. The user interface should indicate this fact to the user, to help them choose the correct service from a set of similar alternatives. */
    isCircularRoute?: boolean | number
    /** A flag to indicate that this service is cancelled at this location. */
    isCancelled?: boolean | number
    /** A flag to indicate that this service is no longer stopping at the requested from/to filter location. */
    filterLocationCancelled?: boolean | number
    /** The type of service (train, bus, ferry) that this item represents. Note that real-time information (e.g. eta, etd, ata, atd, isCancelled, etc.) is only available and present for train services. */
    serviceType?: boolean | number
    /** The train length (number of units) at this location. If not supplied, or zero, the length is unknown. */
    length?: boolean | number
    /** True if the service detaches units from the front at this location. */
    detachFront?: boolean | number
    /** True if the service is operating in the reverse of its normal formation. */
    isReverseFormation?: boolean | number
    /** A cancellation reason for this service. */
    cancelReason?: boolean | number
    /** A delay reason for this service. */
    delayReason?: boolean | number
    /** A list of Adhoc Alerts related to this location for this service. This list contains an object called `AdhocAlertTextType` which contains a string to show the Adhoc Alert Text for the location. */
    adhocAlerts?: boolean | number
    /** The unique service identifier of this service relative to the station board on which it is displayed. This value can be passed to GetServiceDetails to obtain the full details of the individual service. */
    serviceID?: boolean | number
    /** The Retail Service ID of the service, if known. */
    rsid?: boolean | number
    /** A list of `ServiceLocation` objects giving original origins of this service. Note that a service may have more than one original origin, if the service comprises of multiple trains that join at a previous location in the schedule. Original Origins will only be available for Arrival and Arrival & Departure station boards. */
    origin?: ServiceLocationRequest
    /** A list of `ServiceLocation` objects giving original destinations of this service. Note that a service may have more than one original destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Original Destinations will only be available for Departure and Arrival & Departure station boards. */
    destination?: ServiceLocationRequest
    /** An optional list of `ServiceLocation` objects giving live/current origins of this service which is not starting at original cancelled origins. Note that a service may have more than one live origin. if the service comprises of multiple trains that join at a previous location in the schedule. Live Origins will only be available for Arrival and Arrival & Departure station boards. */
    currentOrigins?: ServiceLocationRequest
    /** An optional list of `ServiceLocation` objects giving live/current destinations of this service which is not ending at original cancelled destinations. Note that a service may have more than one live destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Live Destinations will only be available for Departure and Arrival & Departure station boards. */
    currentDestinations?: ServiceLocationRequest
    /** FormationData for this ServiceItem, if any. */
    formation?: FormationDataRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ServiceLocationRequest{
    /** The name of the location. */
    locationName?: boolean | number
    /** The CRS code of this location. A CRS code of ??? indicates an error situation where no crs code is known for this location. */
    crs?: boolean | number
    /** An optional via text that should be displayed after the location, to indicate further information about an ambiguous route. Note that vias are only present for ServiceLocation objects that appear in destination lists. */
    via?: boolean | number
    /** A text string contianing service type (Bus/Ferry/Train) to which will be changed in the future. */
    futureChangeTo?: boolean | number
    /** This origin or destination can no longer be reached because the association has been cancelled. */
    assocIsCancelled?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FormationDataRequest{
    /** The average loading value for this formation. */
    avgLoading?: boolean | number
    /** A collection of CoachData objects related to this formation. */
    coaches?: CoachDataRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CoachDataRequest{
    /** The class of coach, where known. First, Mixed or Standard. Other classes may be introduced in the future. */
    coachClass?: boolean | number
    /** The loading value (0-100) for the coach. */
    loading?: boolean | number
    /** The number/identifier for this coach, e.g. "A" or "12". Maximum of two characters. */
    number?: boolean | number
    /** A ToiletAvailabilityType object representing toilet data. (2017-10-01 schema onwards) */
    toilet?: ToiletAvailabilityTypeRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ToiletAvailabilityTypeRequest{
    /** ToiletStatus enumeration (Unknown, InService, NotInService), indicating service status */
    status?: boolean | number
    /** Type of toilet (Unknown, None, Standard, Accessible) */
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const GetStationBoardResult_possibleTypes = ['GetStationBoardResult']
export const isGetStationBoardResult = (obj?: { __typename?: any } | null): obj is GetStationBoardResult => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGetStationBoardResult"')
  return GetStationBoardResult_possibleTypes.includes(obj.__typename)
}



const ServiceItem_possibleTypes = ['ServiceItem']
export const isServiceItem = (obj?: { __typename?: any } | null): obj is ServiceItem => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isServiceItem"')
  return ServiceItem_possibleTypes.includes(obj.__typename)
}



const ServiceLocation_possibleTypes = ['ServiceLocation']
export const isServiceLocation = (obj?: { __typename?: any } | null): obj is ServiceLocation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isServiceLocation"')
  return ServiceLocation_possibleTypes.includes(obj.__typename)
}



const FormationData_possibleTypes = ['FormationData']
export const isFormationData = (obj?: { __typename?: any } | null): obj is FormationData => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFormationData"')
  return FormationData_possibleTypes.includes(obj.__typename)
}



const CoachData_possibleTypes = ['CoachData']
export const isCoachData = (obj?: { __typename?: any } | null): obj is CoachData => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCoachData"')
  return CoachData_possibleTypes.includes(obj.__typename)
}



const ToiletAvailabilityType_possibleTypes = ['ToiletAvailabilityType']
export const isToiletAvailabilityType = (obj?: { __typename?: any } | null): obj is ToiletAvailabilityType => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isToiletAvailabilityType"')
  return ToiletAvailabilityType_possibleTypes.includes(obj.__typename)
}


export interface QueryPromiseChain{
    
/** Returns all public arrivals and departures for the supplied CRS code within a defined time window. See <https://realtime.nationalrail.co.uk/OpenLDBWS/#GetArrivalDepartureBoardHeader> */
station: ((args: {
/** The CRS code of the location for which the request is being made. */
crs: Scalars['CRS'],
/** The number of services to return in the resulting station board. */
numRows?: (Scalars['PositiveInt'] | null),
/** The CRS code of either an origin or destination location to filter in. */
filterCrs?: (Scalars['CRS'] | null),
/** The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to". */
filterType?: (FilterType | null),
/** An offset in minutes against the current time to provide the station board for. Defaults to 0. */
timeOffset?: (Scalars['TimeOffset'] | null),
/** How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. */
timeWindow?: (Scalars['TimeWindow'] | null)}) => GetStationBoardResultPromiseChain & {get: <R extends GetStationBoardResultRequest>(request: R, defaultValue?: FieldsSelection<GetStationBoardResult, R>) => Promise<FieldsSelection<GetStationBoardResult, R>>})
}

export interface QueryObservableChain{
    
/** Returns all public arrivals and departures for the supplied CRS code within a defined time window. See <https://realtime.nationalrail.co.uk/OpenLDBWS/#GetArrivalDepartureBoardHeader> */
station: ((args: {
/** The CRS code of the location for which the request is being made. */
crs: Scalars['CRS'],
/** The number of services to return in the resulting station board. */
numRows?: (Scalars['PositiveInt'] | null),
/** The CRS code of either an origin or destination location to filter in. */
filterCrs?: (Scalars['CRS'] | null),
/** The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to". */
filterType?: (FilterType | null),
/** An offset in minutes against the current time to provide the station board for. Defaults to 0. */
timeOffset?: (Scalars['TimeOffset'] | null),
/** How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. */
timeWindow?: (Scalars['TimeWindow'] | null)}) => GetStationBoardResultObservableChain & {get: <R extends GetStationBoardResultRequest>(request: R, defaultValue?: FieldsSelection<GetStationBoardResult, R>) => Observable<FieldsSelection<GetStationBoardResult, R>>})
}

export interface GetStationBoardResultPromiseChain{
    
/** The time at which the station board was generated. */
generatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    
/** The name of the location that the station board is for. */
locationName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The CRS code of the location that the station board is for. */
crs: ({get: (request?: boolean|number, defaultValue?: Scalars['CRS']) => Promise<Scalars['CRS']>}),
    
/** If a filter was requested, the location name of the filter location. */
filterLocationName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** If a filter was requested, the CRS code of the filter location. */
filtercrs: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** If a filter was requested, the type of filter. */
filterType: ({get: (request?: boolean|number, defaultValue?: (FilterType | undefined)) => Promise<(FilterType | undefined)>}),
    
/** An optional list of textual messages that should be displayed with the station board. The message may include embedded and xml encoded HTML-like hyperlinks and paragraphs. The messages are typically used to display important disruption information that applies to the location that the station board was for. Any embedded <p> tags are used to force a new-line in the output. Embedded <a> tags allow links to external web pages that may provide more information. Output channels that do not support HTML should strip out the <a> tags and just leave the enclosed text. */
nrccMessages: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'][] | undefined)) => Promise<(Scalars['String'][] | undefined)>}),
    
/** An optional value that indicates if platform information is available. If this value is present with the value `true` then platform information will be returned in the service lists. If this value is not present, or has the value `false`, then the platform "heading" should be suppressed in the user interface for this station board. */
platformAvailable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** An optional value that indicates if services are currently available for this station board. If this value is present with the value `false` then no services will be returned in the service lists. This value may be set, for example, if access to a station has been closed to the public at short notice, even though the scheduled services are still running. It would be usual in such cases for one of the nrccMessages to describe why the list of services has been suppressed. */
areServicesAvailable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
trainServices: ({get: <R extends ServiceItemRequest>(request: R, defaultValue?: (FieldsSelection<ServiceItem, R>[] | undefined)) => Promise<(FieldsSelection<ServiceItem, R>[] | undefined)>}),
    
/** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
busServices: ({get: <R extends ServiceItemRequest>(request: R, defaultValue?: (FieldsSelection<ServiceItem, R>[] | undefined)) => Promise<(FieldsSelection<ServiceItem, R>[] | undefined)>}),
    
/** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
ferryServices: ({get: <R extends ServiceItemRequest>(request: R, defaultValue?: (FieldsSelection<ServiceItem, R>[] | undefined)) => Promise<(FieldsSelection<ServiceItem, R>[] | undefined)>})
}

export interface GetStationBoardResultObservableChain{
    
/** The time at which the station board was generated. */
generatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    
/** The name of the location that the station board is for. */
locationName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The CRS code of the location that the station board is for. */
crs: ({get: (request?: boolean|number, defaultValue?: Scalars['CRS']) => Observable<Scalars['CRS']>}),
    
/** If a filter was requested, the location name of the filter location. */
filterLocationName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** If a filter was requested, the CRS code of the filter location. */
filtercrs: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** If a filter was requested, the type of filter. */
filterType: ({get: (request?: boolean|number, defaultValue?: (FilterType | undefined)) => Observable<(FilterType | undefined)>}),
    
/** An optional list of textual messages that should be displayed with the station board. The message may include embedded and xml encoded HTML-like hyperlinks and paragraphs. The messages are typically used to display important disruption information that applies to the location that the station board was for. Any embedded <p> tags are used to force a new-line in the output. Embedded <a> tags allow links to external web pages that may provide more information. Output channels that do not support HTML should strip out the <a> tags and just leave the enclosed text. */
nrccMessages: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'][] | undefined)) => Observable<(Scalars['String'][] | undefined)>}),
    
/** An optional value that indicates if platform information is available. If this value is present with the value `true` then platform information will be returned in the service lists. If this value is not present, or has the value `false`, then the platform "heading" should be suppressed in the user interface for this station board. */
platformAvailable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** An optional value that indicates if services are currently available for this station board. If this value is present with the value `false` then no services will be returned in the service lists. This value may be set, for example, if access to a station has been closed to the public at short notice, even though the scheduled services are still running. It would be usual in such cases for one of the nrccMessages to describe why the list of services has been suppressed. */
areServicesAvailable: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
trainServices: ({get: <R extends ServiceItemRequest>(request: R, defaultValue?: (FieldsSelection<ServiceItem, R>[] | undefined)) => Observable<(FieldsSelection<ServiceItem, R>[] | undefined)>}),
    
/** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
busServices: ({get: <R extends ServiceItemRequest>(request: R, defaultValue?: (FieldsSelection<ServiceItem, R>[] | undefined)) => Observable<(FieldsSelection<ServiceItem, R>[] | undefined)>}),
    
/** Each of these lists contains a `ServiceItem` object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. */
ferryServices: ({get: <R extends ServiceItemRequest>(request: R, defaultValue?: (FieldsSelection<ServiceItem, R>[] | undefined)) => Observable<(FieldsSelection<ServiceItem, R>[] | undefined)>})
}

export interface ServiceItemPromiseChain{
    
/** An optional Scheduled Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards but may also not be present at locations that are not scheduled to arrive at the location (e.g. the origin). */
sta: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** An optional Estimated Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards and only where an sta time is present. */
eta: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** An optional Scheduled Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards but may also not be present at locations that are not scheduled to depart at the location (e.g. the destination). */
std: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** An optional Estimated Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards and only where an std time is present. */
etd: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** An optional platform number for the service at this location. This will only be present where available and where the station board platformAvailable value is `true`. */
platform: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** The name of the Train Operating Company that operates the service. */
operator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The code of the Train Operating Company that operates the service. */
operatorCode: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** If this value is present and has the value `true` then the service is operating on a circular route through the network and will call again at this location later on its journey. The user interface should indicate this fact to the user, to help them choose the correct service from a set of similar alternatives. */
isCircularRoute: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** A flag to indicate that this service is cancelled at this location. */
isCancelled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** A flag to indicate that this service is no longer stopping at the requested from/to filter location. */
filterLocationCancelled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** The type of service (train, bus, ferry) that this item represents. Note that real-time information (e.g. eta, etd, ata, atd, isCancelled, etc.) is only available and present for train services. */
serviceType: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** The train length (number of units) at this location. If not supplied, or zero, the length is unknown. */
length: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** True if the service detaches units from the front at this location. */
detachFront: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** True if the service is operating in the reverse of its normal formation. */
isReverseFormation: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** A cancellation reason for this service. */
cancelReason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** A delay reason for this service. */
delayReason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** A list of Adhoc Alerts related to this location for this service. This list contains an object called `AdhocAlertTextType` which contains a string to show the Adhoc Alert Text for the location. */
adhocAlerts: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** The unique service identifier of this service relative to the station board on which it is displayed. This value can be passed to GetServiceDetails to obtain the full details of the individual service. */
serviceID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The Retail Service ID of the service, if known. */
rsid: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** A list of `ServiceLocation` objects giving original origins of this service. Note that a service may have more than one original origin, if the service comprises of multiple trains that join at a previous location in the schedule. Original Origins will only be available for Arrival and Arrival & Departure station boards. */
origin: ({get: <R extends ServiceLocationRequest>(request: R, defaultValue?: (FieldsSelection<ServiceLocation, R>[] | undefined)) => Promise<(FieldsSelection<ServiceLocation, R>[] | undefined)>}),
    
/** A list of `ServiceLocation` objects giving original destinations of this service. Note that a service may have more than one original destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Original Destinations will only be available for Departure and Arrival & Departure station boards. */
destination: ({get: <R extends ServiceLocationRequest>(request: R, defaultValue?: (FieldsSelection<ServiceLocation, R>[] | undefined)) => Promise<(FieldsSelection<ServiceLocation, R>[] | undefined)>}),
    
/** An optional list of `ServiceLocation` objects giving live/current origins of this service which is not starting at original cancelled origins. Note that a service may have more than one live origin. if the service comprises of multiple trains that join at a previous location in the schedule. Live Origins will only be available for Arrival and Arrival & Departure station boards. */
currentOrigins: ({get: <R extends ServiceLocationRequest>(request: R, defaultValue?: (FieldsSelection<ServiceLocation, R>[] | undefined)) => Promise<(FieldsSelection<ServiceLocation, R>[] | undefined)>}),
    
/** An optional list of `ServiceLocation` objects giving live/current destinations of this service which is not ending at original cancelled destinations. Note that a service may have more than one live destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Live Destinations will only be available for Departure and Arrival & Departure station boards. */
currentDestinations: ({get: <R extends ServiceLocationRequest>(request: R, defaultValue?: (FieldsSelection<ServiceLocation, R>[] | undefined)) => Promise<(FieldsSelection<ServiceLocation, R>[] | undefined)>}),
    
/** FormationData for this ServiceItem, if any. */
formation: (FormationDataPromiseChain & {get: <R extends FormationDataRequest>(request: R, defaultValue?: (FieldsSelection<FormationData, R> | undefined)) => Promise<(FieldsSelection<FormationData, R> | undefined)>})
}

export interface ServiceItemObservableChain{
    
/** An optional Scheduled Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards but may also not be present at locations that are not scheduled to arrive at the location (e.g. the origin). */
sta: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** An optional Estimated Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards and only where an sta time is present. */
eta: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** An optional Scheduled Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards but may also not be present at locations that are not scheduled to depart at the location (e.g. the destination). */
std: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** An optional Estimated Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards and only where an std time is present. */
etd: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** An optional platform number for the service at this location. This will only be present where available and where the station board platformAvailable value is `true`. */
platform: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** The name of the Train Operating Company that operates the service. */
operator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The code of the Train Operating Company that operates the service. */
operatorCode: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** If this value is present and has the value `true` then the service is operating on a circular route through the network and will call again at this location later on its journey. The user interface should indicate this fact to the user, to help them choose the correct service from a set of similar alternatives. */
isCircularRoute: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** A flag to indicate that this service is cancelled at this location. */
isCancelled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** A flag to indicate that this service is no longer stopping at the requested from/to filter location. */
filterLocationCancelled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** The type of service (train, bus, ferry) that this item represents. Note that real-time information (e.g. eta, etd, ata, atd, isCancelled, etc.) is only available and present for train services. */
serviceType: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** The train length (number of units) at this location. If not supplied, or zero, the length is unknown. */
length: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** True if the service detaches units from the front at this location. */
detachFront: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** True if the service is operating in the reverse of its normal formation. */
isReverseFormation: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** A cancellation reason for this service. */
cancelReason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** A delay reason for this service. */
delayReason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** A list of Adhoc Alerts related to this location for this service. This list contains an object called `AdhocAlertTextType` which contains a string to show the Adhoc Alert Text for the location. */
adhocAlerts: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** The unique service identifier of this service relative to the station board on which it is displayed. This value can be passed to GetServiceDetails to obtain the full details of the individual service. */
serviceID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The Retail Service ID of the service, if known. */
rsid: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** A list of `ServiceLocation` objects giving original origins of this service. Note that a service may have more than one original origin, if the service comprises of multiple trains that join at a previous location in the schedule. Original Origins will only be available for Arrival and Arrival & Departure station boards. */
origin: ({get: <R extends ServiceLocationRequest>(request: R, defaultValue?: (FieldsSelection<ServiceLocation, R>[] | undefined)) => Observable<(FieldsSelection<ServiceLocation, R>[] | undefined)>}),
    
/** A list of `ServiceLocation` objects giving original destinations of this service. Note that a service may have more than one original destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Original Destinations will only be available for Departure and Arrival & Departure station boards. */
destination: ({get: <R extends ServiceLocationRequest>(request: R, defaultValue?: (FieldsSelection<ServiceLocation, R>[] | undefined)) => Observable<(FieldsSelection<ServiceLocation, R>[] | undefined)>}),
    
/** An optional list of `ServiceLocation` objects giving live/current origins of this service which is not starting at original cancelled origins. Note that a service may have more than one live origin. if the service comprises of multiple trains that join at a previous location in the schedule. Live Origins will only be available for Arrival and Arrival & Departure station boards. */
currentOrigins: ({get: <R extends ServiceLocationRequest>(request: R, defaultValue?: (FieldsSelection<ServiceLocation, R>[] | undefined)) => Observable<(FieldsSelection<ServiceLocation, R>[] | undefined)>}),
    
/** An optional list of `ServiceLocation` objects giving live/current destinations of this service which is not ending at original cancelled destinations. Note that a service may have more than one live destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Live Destinations will only be available for Departure and Arrival & Departure station boards. */
currentDestinations: ({get: <R extends ServiceLocationRequest>(request: R, defaultValue?: (FieldsSelection<ServiceLocation, R>[] | undefined)) => Observable<(FieldsSelection<ServiceLocation, R>[] | undefined)>}),
    
/** FormationData for this ServiceItem, if any. */
formation: (FormationDataObservableChain & {get: <R extends FormationDataRequest>(request: R, defaultValue?: (FieldsSelection<FormationData, R> | undefined)) => Observable<(FieldsSelection<FormationData, R> | undefined)>})
}

export interface ServiceLocationPromiseChain{
    
/** The name of the location. */
locationName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The CRS code of this location. A CRS code of ??? indicates an error situation where no crs code is known for this location. */
crs: ({get: (request?: boolean|number, defaultValue?: Scalars['CRS']) => Promise<Scalars['CRS']>}),
    
/** An optional via text that should be displayed after the location, to indicate further information about an ambiguous route. Note that vias are only present for ServiceLocation objects that appear in destination lists. */
via: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** A text string contianing service type (Bus/Ferry/Train) to which will be changed in the future. */
futureChangeTo: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** This origin or destination can no longer be reached because the association has been cancelled. */
assocIsCancelled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface ServiceLocationObservableChain{
    
/** The name of the location. */
locationName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The CRS code of this location. A CRS code of ??? indicates an error situation where no crs code is known for this location. */
crs: ({get: (request?: boolean|number, defaultValue?: Scalars['CRS']) => Observable<Scalars['CRS']>}),
    
/** An optional via text that should be displayed after the location, to indicate further information about an ambiguous route. Note that vias are only present for ServiceLocation objects that appear in destination lists. */
via: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** A text string contianing service type (Bus/Ferry/Train) to which will be changed in the future. */
futureChangeTo: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** This origin or destination can no longer be reached because the association has been cancelled. */
assocIsCancelled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface FormationDataPromiseChain{
    
/** The average loading value for this formation. */
avgLoading: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    
/** A collection of CoachData objects related to this formation. */
coaches: ({get: <R extends CoachDataRequest>(request: R, defaultValue?: FieldsSelection<CoachData, R>[]) => Promise<FieldsSelection<CoachData, R>[]>})
}

export interface FormationDataObservableChain{
    
/** The average loading value for this formation. */
avgLoading: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    
/** A collection of CoachData objects related to this formation. */
coaches: ({get: <R extends CoachDataRequest>(request: R, defaultValue?: FieldsSelection<CoachData, R>[]) => Observable<FieldsSelection<CoachData, R>[]>})
}

export interface CoachDataPromiseChain{
    
/** The class of coach, where known. First, Mixed or Standard. Other classes may be introduced in the future. */
coachClass: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The loading value (0-100) for the coach. */
loading: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    
/** The number/identifier for this coach, e.g. "A" or "12". Maximum of two characters. */
number: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** A ToiletAvailabilityType object representing toilet data. (2017-10-01 schema onwards) */
toilet: (ToiletAvailabilityTypePromiseChain & {get: <R extends ToiletAvailabilityTypeRequest>(request: R, defaultValue?: FieldsSelection<ToiletAvailabilityType, R>) => Promise<FieldsSelection<ToiletAvailabilityType, R>>})
}

export interface CoachDataObservableChain{
    
/** The class of coach, where known. First, Mixed or Standard. Other classes may be introduced in the future. */
coachClass: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The loading value (0-100) for the coach. */
loading: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    
/** The number/identifier for this coach, e.g. "A" or "12". Maximum of two characters. */
number: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** A ToiletAvailabilityType object representing toilet data. (2017-10-01 schema onwards) */
toilet: (ToiletAvailabilityTypeObservableChain & {get: <R extends ToiletAvailabilityTypeRequest>(request: R, defaultValue?: FieldsSelection<ToiletAvailabilityType, R>) => Observable<FieldsSelection<ToiletAvailabilityType, R>>})
}

export interface ToiletAvailabilityTypePromiseChain{
    
/** ToiletStatus enumeration (Unknown, InService, NotInService), indicating service status */
status: ({get: (request?: boolean|number, defaultValue?: (ToiletStatus | undefined)) => Promise<(ToiletStatus | undefined)>}),
    
/** Type of toilet (Unknown, None, Standard, Accessible) */
value: ({get: (request?: boolean|number, defaultValue?: (ToiletType | undefined)) => Promise<(ToiletType | undefined)>})
}

export interface ToiletAvailabilityTypeObservableChain{
    
/** ToiletStatus enumeration (Unknown, InService, NotInService), indicating service status */
status: ({get: (request?: boolean|number, defaultValue?: (ToiletStatus | undefined)) => Observable<(ToiletStatus | undefined)>}),
    
/** Type of toilet (Unknown, None, Standard, Accessible) */
value: ({get: (request?: boolean|number, defaultValue?: (ToiletType | undefined)) => Observable<(ToiletType | undefined)>})
}