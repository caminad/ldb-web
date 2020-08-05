import { NextApiRequest, NextApiResponse } from 'next';
import station_codes from 'data/station_codes.json';
import fuzzysort from 'fuzzysort';
import castArray from 'lodash/castArray';

const targets = station_codes.map(([name]) => fuzzysort.prepare(name));

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const results = fuzzysort.go(castArray(req.query.q)[0], targets, {
    limit: 20,
  });
  res.json(results.map((result) => result.target));
};
