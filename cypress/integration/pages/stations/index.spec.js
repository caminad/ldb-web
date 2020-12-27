describe('Stations Search Page', () => {
  it('Searches for a station', () => {
    cy.visit('http://localhost:3000/stations')
      .get('[data-cy=SearchField]')
      .type('glasgow')
      .url()
      .should('contain', 'glasgow');

    cy.contains('Glasgow Queen Street')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/stations/Glasgow_Queen_Street');

    cy.contains('Glasgow Queen Street')
      .click()
      .url()
      .should('contain', 'Glasgow+Queen+Street');

    cy.get('[data-cy=SearchField]').should(
      'have.value',
      'Glasgow Queen Street'
    );
  });

  it('Has a back button', () => {
    cy.visit('http://localhost:3000/stations/Glasgow_Queen_Street')
      .visit('http://localhost:3000/stations')
      .get('[data-cy=SearchField]')
      .type('blah')
      .url()
      .should('contain', 'blah');

    cy.get('[data-cy=SearchField]')
      .type('blahblah')
      .url()
      .should('contain', 'blahblahblah');

    cy.get('[data-cy=BackButton]')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/stations/Glasgow_Queen_Street');
  });
});
