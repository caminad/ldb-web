import { decodeName, encodeName } from '../../../models/Station';

describe('decodeName', () => {
  it('replaces underscores with spaces', () => {
    cy.wrap(decodeName('Glasgow_Queen_Street')).should(
      'eq',
      'Glasgow Queen Street'
    );
  });

  it('decodes URI entities', () => {
    cy.wrap(decodeName('Elephant_%26_Castle_(Underground)')).should(
      'eq',
      'Elephant & Castle (Underground)'
    );
  });

  it('returns an empty string given undefined', () => {
    cy.wrap(decodeName(undefined)).should('eq', '');
  });

  it('decodes only the first element of multiple queries', () => {
    cy.wrap(decodeName(['Bristol_Temple_Meads', 'Penzance'])).should(
      'eq',
      'Bristol Temple Meads'
    );
  });
});

describe('encodeName', () => {
  it('replaces spaces with underscores', () => {
    cy.wrap(encodeName('Glasgow Queen Street')).should(
      'eq',
      'Glasgow_Queen_Street'
    );
  });

  it('encodes URI entities', () => {
    cy.wrap(encodeName('Elephant & Castle (Underground)')).should(
      'eq',
      'Elephant_%26_Castle_(Underground)'
    );
  });

  it('returns an empty string given undefined', () => {
    cy.wrap(encodeName(undefined)).should('eq', '');
  });

  it('encodes only the first element of multiple queries', () => {
    cy.wrap(encodeName(['Bristol Temple Meads', 'Penzance'])).should(
      'eq',
      'Bristol_Temple_Meads'
    );
  });
});
