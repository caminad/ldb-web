import { Client as LiveDepartureBoardClient } from '@kitibyte/ldb/ldb.js';
import { ArrivalsDepartures } from '@kitibyte/ldb/operations.js';
import Ajv from 'ajv';
import { NextApiRequest, NextApiResponse } from 'next';

const client = new LiveDepartureBoardClient({
  accessToken: process.env.LDB_TOKEN,
});

const validate = new Ajv({ coerceTypes: true }).compile(
  ArrivalsDepartures.requestSchema
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!validate(req.query)) {
    res.status(404).json({ errors: 'Not Found' });
  } else {
    res.json(await client.request('ArrivalsDepartures', req.query));
  }
};
