import castArray from 'lodash/castArray';

export function decodeName(x: string | string[] | undefined): string {
  const [encoded = ''] = castArray(x);
  return decodeURIComponent(encoded).replace(/_/g, ' ');
}

export function encodeName(x: string | string[] | undefined): string {
  const [decoded = ''] = castArray(x);
  return encodeURIComponent(decoded.replace(/ /g, '_'));
}
