import { decodeName, encodeName } from 'models/station';

describe(decodeName, () => {
  it('replaces underscores with spaces', () => {
    expect(decodeName('Glasgow_Queen_Street')).toBe('Glasgow Queen Street');
  });

  it('decodes URI entities', () => {
    expect(decodeName('Elephant_%26_Castle_(Underground)')).toBe(
      'Elephant & Castle (Underground)'
    );
  });

  it('returns an empty string given undefined', () => {
    expect(decodeName(undefined)).toBe('');
  });

  it('decodes only the first element of multiple queries', () => {
    expect(decodeName(['Bristol_Temple_Meads', 'Penzance'])).toBe(
      'Bristol Temple Meads'
    );
  });
});

describe(encodeName, () => {
  it('replaces spaces with underscores', () => {
    expect(encodeName('Glasgow Queen Street')).toBe('Glasgow_Queen_Street');
  });

  it('encodes URI entities', () => {
    expect(encodeName('Elephant & Castle (Underground)')).toBe(
      'Elephant_%26_Castle_(Underground)'
    );
  });

  it('returns an empty string given undefined', () => {
    expect(encodeName(undefined)).toBe('');
  });

  it('encodes only the first element of multiple queries', () => {
    expect(encodeName(['Bristol Temple Meads', 'Penzance'])).toBe(
      'Bristol_Temple_Meads'
    );
  });
});
