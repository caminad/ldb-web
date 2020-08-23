import stations from 'data/stations.json';
import { NextApiRequest, NextApiResponse } from 'next';

const names = Object.keys(stations);

export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.json(names);
};
