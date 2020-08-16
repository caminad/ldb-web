import { Client as LiveDepartureBoardClient } from '@kitibyte/ldb/ldb.js';
import stations from 'data/stations.json';
import invert from 'lodash/invert';
import isObject from 'lodash/isObject';
import { decodeName } from 'models/station';
import { NextApiRequest, NextApiResponse } from 'next';

const stationsByCRS = invert(stations);

const client = new LiveDepartureBoardClient({
  accessToken: process.env.LDB_TOKEN,
});

function isLocationName(value: string): value is keyof typeof stations {
  return stations.hasOwnProperty(value);
}

function setLocationNamesFromCRS(obj: any): any {
  Object.values(obj).filter(isObject).forEach(setLocationNamesFromCRS);
  if (obj.crs) {
    obj.locationName = stationsByCRS[obj.crs];
  }
  return obj;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const locationName = decodeName(req.query.name);

  if (!isLocationName(locationName)) {
    return res.status(404).json({ error: 'Not Found' });
  }

  const data = await client
    .request('ArrivalsDepartures', {
      crs: stations[locationName],
      numRows: Number(req.query.limit) || undefined,
    })
    .then(setLocationNamesFromCRS);

  res.json(data);
};
