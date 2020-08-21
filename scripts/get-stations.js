#!/usr/bin/env node

const https = require('https');
const parse = require('csv-parse');

const PAGE_URL = new URL(
  'https://www.nationalrail.co.uk/stations_destinations/48541.aspx'
);

const parser = parse(parserCallback);

https.get(PAGE_URL, (res) => {
  let csvUrl;
  res.on('data', (chunk) => {
    // Hacking up HTML here as the path name can change.
    // Current URL: https://www.nationalrail.co.uk/station_codes%20(06-08-2020).csv
    const match = /"\/.*?\.csv"/.exec(chunk);
    if (match) {
      csvUrl = new URL(match[0].slice(1, -1), PAGE_URL);
    }
  });

  res.on('end', () => {
    if (!csvUrl) {
      throw new Error(`CSV URL not found in ${PAGE_URL}`);
    }

    https.get(csvUrl, (res) => {
      res.on('data', (chunk) => {
        parser.write(chunk);
      });

      res.on('end', () => {
        parser.end();
      });
    });
  });
});

/**
 * @param {Error} error
 * @param {string[][]} data
 */
function parserCallback(error, data) {
  // Currently the CSV contains multiple columns of variable length.
  // As of 2020-08-06 the first row is as follows:
  // Station Name (A-F),CRS Code,Station Name (G-M),CRS Code,Station Name (N-R),CRS Code,Station Name (S-Y),CRS Code

  if (error) {
    throw error;
  }

  const collator = new Intl.Collator('en-GB');

  const records = data.slice(1);

  /** @type {[key: string, value: string][]} */
  const entries = [];

  for (const record of records) {
    record.forEach((item, i) => {
      if (item && i % 2 === 0) {
        entries.push([item, record[i + 1]]);
      }
    });
  }

  entries.sort((a, b) => collator.compare(a[0], b[0]));

  const result = entries.reduce(
    (obj, [k, v]) => Object.assign(obj, { [k]: v }),
    Object.create(null)
  );

  console.log(JSON.stringify(result, undefined, 2));
}
