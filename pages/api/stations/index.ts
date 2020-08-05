import stations from 'data/stations.json';
import fuzzysort from 'fuzzysort';
import castArray from 'lodash/castArray';
import { NextApiRequest, NextApiResponse } from 'next';

const targets = Object.keys(stations).map(fuzzysort.prepare);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const results = fuzzysort.go(castArray(req.query.q)[0], targets, {
    limit: 20,
  });
  res.json(results.map((result) => result.target));
};
