import Service from 'models/Service';

export default interface Station {
  crs: string;
  locationName: string;
  generatedAt: string;
  nrccMessages?: string[];
  platformAvailable: boolean;
  trainServices?: Service[];
  busServices?: Service[];
}

export function decodeName(x: string | string[] | undefined): string {
  return decodeURIComponent(first(x) ?? '').replace(/_/g, ' ');
}

export function encodeName(x: string | string[] | undefined): string {
  return encodeURIComponent(first(x)?.replace(/ /g, '_') ?? '');
}

function first<T>(x: T | T[] | undefined): T | undefined {
  return Array.isArray(x) ? x[0] : x;
}
