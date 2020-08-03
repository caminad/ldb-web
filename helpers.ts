export function ensureArray<T>(value: T | T[]): T[] {
  if (!Array.isArray(value)) {
    return [value];
  }
  return value;
}

export function isDefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}
