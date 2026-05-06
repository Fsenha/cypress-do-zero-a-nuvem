describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
const longText = Cypress._.repeat('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 10)
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Testa os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#product').select('YouTube')
    cy.get('input[value=feedback]').check()
    cy.get('input[value=email]').check()
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type=submit]').click()
    cy.get('.success').should('be.visible')
  })
    //cy.get('#file-upload').selectFile('cypress/fixtures/cachorro.jpg')
  
    
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.visit('./src/index.html')
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@@')
    cy.get('#product').select('YouTube')
    cy.get('input[value=email]').check()
    cy.get('#open-text-area').type('Teste de email inválido')
    cy.get('button[type=submit]').click()
	  cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com letras', () => {
    cy.get('#phone').type('abc')
    cy.get('#phone').should('have.value','')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#product').select('YouTube')
    cy.get('input[value=feedback]').check()
    cy.get('input[value=phone]').check()
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type=submit]').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#phone').type('11940174442')

    // valida que existem
    cy.get('#firstName, #lastName, #email, #phone')
      .should('exist')

    // limpa campos
    cy.get('#firstName').clear()
    cy.get('#lastName').clear()
    cy.get('#email').clear()
    cy.get('#phone').clear()

    // valida que estão vazios
    cy.get('#firstName').should('have.value', '')
    cy.get('#lastName').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#phone').should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type=submit]').click()
    cy.get('.error').should('be.visible')
  })

  it.only('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

})