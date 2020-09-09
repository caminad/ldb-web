/// <reference types="cypress" />

describe('Landing Page', () => {
  it('Contains “Powered by National Rail Enquiries” attribution link', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Powered by National Rail Enquiries')
      .should('have.attr', 'href', 'https://www.nationalrail.co.uk/')
      .should('have.attr', 'target', '_blank');
  });
});
