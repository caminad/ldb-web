import stations from '../../../data/station_codes.json';
import fuzzy from 'fuzzy';

/**
 * @type {import('next').NextApiHandler}
 */
export default (req, res) => {
  const results = fuzzy.filter(String(req.query.search), stations, {
    extract(el) {
      return el.locationName;
    },
  });
  res.json(results.slice(0, 20).map((result) => result.original));
};
