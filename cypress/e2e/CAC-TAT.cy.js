describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
const longText = Cypress._.repeat('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 10)
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  //teste da função cy.clock() para controlar o tempo
  it('Testa os campos obrigatórios e envia o formulário', () => {
    cy.clock()
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#product').select('YouTube')
    cy.get('input[value=feedback]').check()
    cy.get('input[value=email]').check()
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })  
    

  //teste da função lodash.times() para repetir o mesmo teste várias vezes
  Cypress._.times(5, () => {
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      cy.visit('./src/index.html')
      cy.get('#firstName').type('João')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('joao.silva@@')
      cy.get('#product').select('YouTube')
      cy.get('input[value=email]').check()
      cy.get('#open-text-area').type('Teste de email inválido')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })
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
    cy.contains('button', 'Enviar').click()
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
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Maria',
      lastName: 'Silva',
      email: 'maria.silva@example.com',
      text: 'Teste'
    }

    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

it('Testa os campos obrigatórios e envia o formulário com o cy.contains', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#product').select('YouTube')
    cy.get('input[value=feedback]').check()
    cy.get('input[value=email]').check()
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

it('seleciona um produto (YouTube) por seu texto', () => {
	cy.get('#product').select('YouTube')
	cy.get('#product').should('have.value', 'youtube')
})

it('seleciona um produto (Mentoria) por seu valor', () => {
	cy.get('#product').select('mentoria')
	cy.get('#product').should('have.value', 'mentoria')
})

it('seleciona um produto (Blog) por seu índice', () => {
	cy.get('#product').select(1)
	cy.get('#product').should('have.value', 'blog')
})

//Conhecendo a funcionalidade should(be.checked)
it('marca o tipo de atendimento "Feedback"', () => {
	cy.get('input[value=feedback]').check()
	cy.get('input[value=feedback]').should('be.checked')
})

//Conhecendo a funcionalidade cy.each e cy.wrap
it('marca cada tipo de atendimento com cy.each e cy.wrap', () => {
	cy.get('input[type=radio]')
    .each(typeOfService => {
      cy.wrap(typeOfService)
        .check()
        .should('be.checked')
    })
})

//Descobrindo a funcionalidade first(), last() e uncheck()
it('marca ambos checkboxes, depois desmarca o último', () => {
	cy.get('input[type=checkbox]')
    .check()
		.should('be.checked')
	cy.get('input[type=checkbox]')
		.last()
		.uncheck()
		.should('not.be.checked')
  cy.get('input[type=checkbox]')
    .first()
    .should('be.checked')
})

it('seleciona um arquivo da pasta fixtures', () => {
	cy.get('#file-upload')
		.selectFile('cypress/fixtures/cachorro.jpg')
		.should(input => {
			expect(input[0].files[0].name).to.be.equal('cachorro.jpg')
		})
})

it('seleciona um arquivo simulando um drag-and-drop', () => {
	cy.get('#file-upload')
		.selectFile('cypress/fixtures/cachorro.jpg', { action: 'drag-drop' })
		.should(input => {
			expect(input[0].files[0].name).to.be.equal('cachorro.jpg')
		})
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
	cy.fixture('cachorro.jpg').as('image')
	cy.get('#file-upload')
		.selectFile('cypress/fixtures/cachorro.jpg')
		.should(input => {
			expect(input[0].files[0].name).to.be.equal('cachorro.jpg')
		})
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique (modo1)', () => {
	cy.get('#privacy a')
     .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')

})
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique (modo2)', () => {
	cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
})
it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

it("preenche o campo da área de texto usando o comando invoke", () => {
	cy.get('#open-text-area')
    .invoke('val', 'um texto qualquer')
    .should('have.value', 'um texto qualquer')
})

it('faz uma requisição HTTP', () => {
  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
  .as('getRequest')
  .its('status')
  .should('eq', 200)
  cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
  cy.get('@getRequest')
    .its('isOkStatusCode')
    .should('be.true')
  })

it("faz uma requisição HTTP e verifica a resposta de outra forma", () => {
	cy.request({
		method: 'GET',
		url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
	})
	.then((response) => {
		expect(response.status).to.be.eq(200)
    console.log(response.body)
		expect(response.body).to.include('CAC TAT')
	})
})

it('vendo o objeto de resposta JSON', () => {
  cy.request('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    cy.log(response)
  })
}) 

it.only('Encontrando o gato', () => {
	cy.contains('🐈')
  cy.get('#cat')
    .invoke('show')
    .should('be.visible')
})

})