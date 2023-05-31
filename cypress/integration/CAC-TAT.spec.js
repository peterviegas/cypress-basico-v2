// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longTest = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Peter')
        cy.get('#lastName').type('Viegas')
        cy.get('#email').type('test@outlook.com')
        cy.get('#phone').type('09999999999')
        cy.get('#open-text-area').type(longTest, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Peter')
        cy.get('#lastName').type('Viegas')
        cy.get('#email').type('test@outlook,com')
        cy.get('#phone').type('09999999999')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor numérico', function() {
        cy.get('#phone')
            .type('aaababddddddd')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Peter')
        cy.get('#lastName').type('Viegas')
        cy.get('#email').type('peter.viegas@outlook.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Peter')
            .should('have.value', 'Peter')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Viegas')
            .should('have.value', 'Viegas')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('peter.viegas@outlook.com')
            .should('have.value', 'peter.viegas@outlook.com')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento Feedback', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .check()
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it.only('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('have.length', 2)
            .last()
            .uncheck()
            .should('not.be.checked')
    })
})