describe('template spec', () => {
  it('deve carregar a página inicial com sucesso', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').should('exist')
  })
})

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Testa os campos obrigatórios do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
  })

})