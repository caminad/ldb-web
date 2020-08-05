import { Client as LiveDepartureBoardClient } from '@kitibyte/ldb/ldb.js';
import { ArrivalsDepartures } from '@kitibyte/ldb/operations.js';
import Ajv from 'ajv';
import stations from 'data/stations.json';
import invert from 'lodash/invert';
import isObject from 'lodash/isObject';
import { NextApiRequest, NextApiResponse } from 'next';

const stationsByCRS = invert(stations);

const isStationName = (x: any): x is keyof typeof stations => x in stations;

const client = new LiveDepartureBoardClient({
  accessToken: process.env.LDB_TOKEN,
});

const validate = new Ajv({ coerceTypes: true }).compile(
  ArrivalsDepartures.requestSchema
);

function replaceNameWithCRS(query: { [key: string]: string | string[] }) {
  if (isStationName(query.name)) {
    query.crs = stations[query.name];
    delete query.name;
    return true;
  }
  return false;
}

function setLocationNamesFromCRS(obj: any): any {
  Object.values(obj).filter(isObject).forEach(setLocationNamesFromCRS);
  if (obj.crs) {
    obj.locationName = stationsByCRS[obj.crs];
  }
  return obj;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!replaceNameWithCRS(req.query)) {
    res.status(404).json({ error: 'Not Found' });
  } else if (!validate(req.query)) {
    res.status(400).json({ error: 'Invalid Query', errors: validate.errors });
  } else {
    const response = await client.request('ArrivalsDepartures', req.query);
    res.json(setLocationNamesFromCRS(response));
  }
};
