import { Client as LiveDepartureBoardClient } from '@kitibyte/ldb/ldb.js';
import { ArrivalsDepartures } from '@kitibyte/ldb/operations.js';
import Ajv from 'ajv';

const client = new LiveDepartureBoardClient({
  accessToken: process.env.LDB_TOKEN,
});

const ajv = new Ajv({ coerceTypes: true });
const validate = ajv.compile(ArrivalsDepartures.requestSchema);

/**
 * @type {import('next').NextApiHandler}
 */
export default async (req, res) => {
  if (!validate(req.query)) {
    res.status(404).json({ errors: 'Not Found' });
  } else {
    res.json(await client.request('ArrivalsDepartures', req.query));
  }
};
