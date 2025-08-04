/// <reference types="cypress" />

beforeEach(() => {
    Cypress.session.clearAllSavedSessions()
})


describe('Teste Funcional de Login', () => {


    it("Validando Login com Sucesso", () => {
        //Chama o commando de login passando Email e Senha valido
        cy.login_teste('ramirobrandao@outlook.com', '123456')
        //Confirmando que foi logado com sucesso se tem a aba Favoritos
        cy.get('[data-cy="link/favoritos"] > .chakra-text').should('have.text', 'Favoritos')
        //Saindo da Conta
        cy.get('[data-cy="btn-trigger-profile"]').click()
        cy.get('[data-cy="btn-logout-profile"]').click()
    });

    it("Validando Email Errado ", () => {
        //Chama o comando de Login passando Email invalido e Senha valida
        cy.login_teste('ramiro@ramiro,com', '123456')
        //Confirmando se aparece notificação de Email invalido 
        cy.get('.chakra-text.css-1a4fscf').should('have.text', 'Digite um e-mail válido.')
    });

    it("Validando Senha Errada", () => {
        //Chama o comando de Login passando Email valido e Senha invalida
        cy.login_teste('ramirobrandao@outlook.com', '1234')
        //Notificação de Senha invalida
        cy.get('.Toastify__toast-body').should('contain', 'Não foi possivel fazer o login! Verifique se o email e a senha estão corretos.')
    });

    it("Validando Campos em Branco ", () => {
        //Chama o comando de Login passando Email invalido e Senha valida
        cy.login_teste('', '')
        cy.get('[data-cy="login-submit"]').click()
        //Notificação digite Email e Senha para continuar
        cy.get('.chakra-text.css-1a4fscf').should('have.text', 'Digite seu e-mail para continuar.')
        cy.get('.chakra-text.css-18uulcg').should('have.text', 'Digite sua senha para continuar.')
    });
});

