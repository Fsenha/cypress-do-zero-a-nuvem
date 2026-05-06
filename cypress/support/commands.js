Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type=submit]').click()
  })