/**
 * Adapted from https://realtime.nationalrail.co.uk/OpenLDBWS/rtti_2017-10-01_ldb.wsdl
 */
const timeOffsetSchema = {
  description:
    "A time offset that may be applied to the current time to give the base time for the departure board. The value could be negative if the client has suitable permission configured, otherwise the minimun value will be 0. If the client is not configured with suitable permission then upper bound will be 119.",
  type: "integer",
  default: 0,
  maximum: 119,
};
const timeWindowSchema = {
  description:
    "The number of minutes added to the request start time to give the end time. The parameter default value is 120 minutes, if the supplied value is greater than 120 or not supplied. If the supplied pararmeter vaule is less than 0 then an error will return.",
  type: "integer",
  default: 120,
  minimum: 1,
  maximum: 120,
};
const crsSchema = {
  type: "string",
  pattern: "^[A-Z]{3}$",
};
const BoardRequestSchema = {
  additionalProperties: false,
  required: ["crs"],
  properties: {
    crs: {
      description:
        "The CRS code for the station departure board that is required.",
      ...crsSchema,
    },
    numRows: {
      description:
        "The maximum number of services that are required to be returned. This will be limited to a maximum value by the server, which may change according to system load or other factors. Only the minimum required number of services should be requested. For example, if only 10 services are displayed in a user interface, then this parameter should be set to 10.",
      type: "integer",
      default: 10,
      minimum: 1,
    },
    filterCrs: {
      description:
        'An optional CRS code that will filter the returned departure board. For example, if crs is set to "MAN", filterCRS is set to "EUS" and filterType is set to "to" then the departure board will return a list of services that depart Manchester Piccadilly and call at London Euston.',
      ...crsSchema,
    },
    filterType: {
      description:
        'The type of filter query that is required, either "from" or "to". This parameter is ignored unless filterCrs is also present.',
      type: "string",
      enum: ["from", "to"],
    },
    timeOffset: timeOffsetSchema,
    timeWindow: timeWindowSchema,
  },
};
const DeparturesRequestSchema = {
  additionalProperties: false,
  required: ["crs", "filterList"],
  properties: {
    crs: {
      description:
        "The CRS code for the station departure board that is required.",
      ...crsSchema,
    },
    filterList: {
      description:
        "A list of CRS codes for the station destinations that are required. There must be at least one and may be no more than a maximum number of CRS codes in this list. The actual limit may vary and can be found in the documentation.",
      type: "object",
      additionalProperties: false,
      required: ["crs"],
      properties: {
        crs: {
          anyOf: [
            crsSchema,
            {
              type: "array",
              minItems: 1,
              uniqueItems: true,
              items: crsSchema,
            },
          ],
        },
      },
    },
    timeOffset: timeOffsetSchema,
    timeWindow: timeWindowSchema,
  },
};
const ServiceRequestSchema = {
  additionalProperties: false,
  required: ["serviceID"],
  properties: {
    serviceID: {
      description:
        "The service ID obtained from a departure board response for which full details are required. Note that service details are only available for a short time after a service has arrived/departed from the location in the departure board that the ID was obtained from.",
      type: "string",
    },
  },
};

module.exports = {
  Arrivals: {
    requestName: "GetArrivalBoardRequest",
    requestSchema: BoardRequestSchema,
  },
  ArrivalsDepartures: {
    requestName: "GetArrivalDepartureBoardRequest",
    requestSchema: BoardRequestSchema,
  },
  ArrivalsDeparturesDetails: {
    requestName: "GetArrDepBoardWithDetailsRequest",
    requestSchema: BoardRequestSchema,
  },
  ArrivalsDetails: {
    requestName: "GetArrBoardWithDetailsRequest",
    requestSchema: BoardRequestSchema,
  },
  Departures: {
    requestName: "GetDepartureBoardRequest",
    requestSchema: BoardRequestSchema,
  },
  DeparturesDetails: {
    requestName: "GetDepBoardWithDetailsRequest",
    requestSchema: BoardRequestSchema,
  },
  FastestDepartures: {
    requestName: "GetFastestDeparturesRequest",
    requestSchema: DeparturesRequestSchema,
  },
  FastestDeparturesDetails: {
    requestName: "GetFastestDeparturesWithDetailsRequest",
    requestSchema: DeparturesRequestSchema,
  },
  NextDepartures: {
    requestName: "GetNextDeparturesRequest",
    requestSchema: DeparturesRequestSchema,
  },
  NextDeparturesDetails: {
    requestName: "GetNextDeparturesWithDetailsRequest",
    requestSchema: DeparturesRequestSchema,
  },
  Service: {
    requestName: "GetServiceDetailsRequest",
    requestSchema: ServiceRequestSchema,
  },
};
