describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Testa os campos obrigatórios do formulário', () => {
    cy.get('#firstName')
    .type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#product').select('YouTube')
    cy.get('input[value=feedback]').check()
    cy.get('input[value=email]').check()
    cy.get('#open-text-area').type('Gostaria de sugerir uma nova funcionalidade para o YouTube.')
    cy.get('#file-upload').selectFile('cypress/fixtures/cachorro.jpg')
    cy.get('button[type=submit]').click()
    cy.get('.success').should('be.visible')
  })

})