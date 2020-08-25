import stations from 'data/stations.json';
import LiveDepartureBoardClient from 'ldb/Client';
import invert from 'lodash/invert';
import isObject from 'lodash/isObject';
import { decodeName } from 'models/Station';
import { NextApiRequest, NextApiResponse } from 'next';

const stationsByCRS = invert(stations);

if (!process.env.LDB_TOKEN) {
  throw new Error('LDB_TOKEN required');
}
const client = new LiveDepartureBoardClient(process.env.LDB_TOKEN);

const isLocationName = Object.prototype.hasOwnProperty.bind(stations) as {
  (v: string): v is keyof typeof stations;
};

function setLocationNamesFromCRS(obj: any): void {
  Object.values(obj).filter(isObject).forEach(setLocationNamesFromCRS);
  if (obj.crs) {
    obj.locationName = stationsByCRS[obj.crs];
  }
  return obj;
}

function formatMessages(data: any): void {
  data.nrccMessages = ([] as any[])
    .concat(data.nrccMessages || [])
    .map((message) =>
      message
        .replace(/<\/?.*?>/g, '')
        .replace(
          / More (?:information|details) can be found in Latest Travel News\.?/i,
          ''
        )
        .trim()
    );
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const locationName = decodeName(req.query.name);

  if (!isLocationName(locationName)) {
    return res.status(404).json({ error: 'Not Found' });
  }

  const data = await client.request('ArrivalsDepartures', {
    crs: stations[locationName],
    numRows: Number(req.query.limit) || undefined,
  });

  setLocationNamesFromCRS(data);
  formatMessages(data);

  res.json(data);
};
