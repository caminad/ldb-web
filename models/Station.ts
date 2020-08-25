import castArray from 'lodash/castArray';
import Service from 'models/Service';

type OneOrMany<T> = T | T[];

export default interface Station {
  locationName: string;
  generatedAt: string;
  nrccMessages: string[];
  platformAvailable?: boolean;
  trainServices?: OneOrMany<Service>;
  busServices?: OneOrMany<Service>;
}

export function decodeName(x: string | string[] | undefined): string {
  const [encoded = ''] = castArray(x);
  return decodeURIComponent(encoded).replace(/_/g, ' ');
}

export function encodeName(x: string | string[] | undefined): string {
  const [decoded = ''] = castArray(x);
  return encodeURIComponent(decoded.replace(/ /g, '_'));
}
