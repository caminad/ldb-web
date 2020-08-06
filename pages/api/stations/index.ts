import stations from 'data/stations.json';
import fuzzysort from 'fuzzysort';
import castArray from 'lodash/castArray';
import { decodeName } from 'models/station';
import { NextApiRequest, NextApiResponse } from 'next';

const names = Object.keys(stations);
const targets = names.map(fuzzysort.prepare);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.q === undefined) {
    res.json(names);
  } else {
    const search = decodeName(castArray(req.query.q)[0]);
    const results = fuzzysort.go(search, targets, { limit: 10 });
    res.json(results.map((result) => result.target));
  }
};
