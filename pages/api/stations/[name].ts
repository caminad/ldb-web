import { Client as LiveDepartureBoardClient } from '@kitibyte/ldb/ldb.js';
import { ArrivalsDepartures } from '@kitibyte/ldb/operations.js';
import Ajv from 'ajv';
import station_codes from 'data/station_codes.json';
import { isObject } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

const stationsByCode = new Map<string, string>();
const stationsByName = new Map<string, string>();
for (const [name, code] of station_codes) {
  stationsByCode.set(code, name);
  stationsByName.set(name, code);
}

const client = new LiveDepartureBoardClient({
  accessToken: process.env.LDB_TOKEN,
});

const validate = new Ajv({ coerceTypes: true }).compile(
  ArrivalsDepartures.requestSchema
);

function replaceNameWithCRS(query: { [key: string]: string | string[] }) {
  const code = stationsByName.get(query.name as string);
  if (code) {
    query.crs = code;
    delete query.name;
    return true;
  }
  return false;
}

function setLocationNamesFromCRS(obj: any): any {
  for (const val of Object.values(obj).filter(isObject)) {
    setLocationNamesFromCRS(val);
  }
  if (obj.crs) {
    obj.locationName = stationsByCode.get(obj.crs);
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
