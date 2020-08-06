import stations from 'data/stations.json';
import fuzzysort from 'fuzzysort';
import castArray from 'lodash/castArray';
import { decodeName } from 'models/station';
import { NextApiRequest, NextApiResponse } from 'next';

const targets = Object.keys(stations).map(fuzzysort.prepare);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const search = decodeName(castArray(req.query.q)[0]);
  const results = fuzzysort.go(search, targets, {
    limit: 20,
  });
  res.json(results.map((result) => result.target));
};
