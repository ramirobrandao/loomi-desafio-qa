/// <reference types="cypress" />

beforeEach(() => {
    cy.login('ramirobrandao@outlook.com', '123456')
})

const baseUrl = 'https://www.kasa.live/'
const time_com_jogo = "Arsenal" // Time com proxima Partida Existente
const time_favorito = 'Internacional' // Time que Deseja Favoritar
const canal_favorito = 'CazéTV' // Canal de Transmissão que Deseja Favoritar

describe('Teste Funcional Da Aba Favoritos', () => {

    it("Busca Uma Partida Existente e Favorita a Partida e Testa o Filtro de Partida Favorita Na Pagina", () => {
        //Busca o Time com Proxima Partida Existente 
        cy.visit(baseUrl)
        //Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        cy.get('#filter-team').click().type(time_com_jogo, { delay: 100 })
        cy.get('#filter-team').click().type('{enter}')
        //Clica no Primeiro Card que Contém o Time
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        cy.get('.css-shtkpc').contains(time_com_jogo).first().click()
        //Favorita A Partida e Fecha o Card
        cy.get('.css-17gh0kn > [aria-label="Favoritar Partida"] > .chakra-image').click()
        cy.get('.chakra-modal__close-btn').click()
        //Visita Aba Favoritos e Checa se contem o Card com o Time selecionado
        cy.get('[data-cy="link/favoritos"] > .chakra-text').click()
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        cy.get('.css-jrf8bn').contains(time_com_jogo)
        //Desativa Filro de Partida Favorita e Checa se o card não aparece mais na aba
        cy.get('[data-cy="switch-favorites"] > .chakra-switch__track').click()
        cy.get('.css-jrf8bn').contains(time_com_jogo).should('not.exist')
        //Ativa Filro de Partida Favorita e Checa se o card agora aparece na aba e depois o remove o Favorito
        cy.get('[data-cy="switch-favorites"] > .chakra-switch__track').click()
        cy.get('.css-jrf8bn').contains(time_com_jogo).click()
        cy.get('.css-17gh0kn > [aria-label="Favoritar Partida"] > .chakra-image').click()

    });



    it("Favoritar Time", () => {
        //Abre o site e visita aba Favoritos
        cy.visit(baseUrl)
        //Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        cy.get('[data-cy="link/favoritos"] > .chakra-text').click()
        //Clica em Favoritar na seção Times Favoritos e Procurar pelo Time Desejado
        cy.get('[data-cy="btn-favorite-team"]').click()
        cy.get('[data-cy="input-search-teams"]').type(time_favorito, { delay: 50 })
        //Clica em Add o Time Desejado aos Favorits e Salva 
        cy.get('.css-or7hvt').find('button').first().click({ force: true })
        cy.get('[data-cy="btn-submit-teams"]').click()
        // Checando se o time favorito agora aparece no Times Favoritos
        cy.get('.css-1ixn91n').contains(time_favorito)
        //Removendo o Time Selecionado do Times Favoritos
        cy.get('[data-cy="btn-edit-teams"]').click()
        cy.get('.css-79elbk > .chakra-button').click()
        cy.get('[data-cy="btn-save-teams"]').click()

    })


    it("Favoritar Canal", () => {
        //Abre o site e visita aba Favoritos
        cy.visit(baseUrl)
        //Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        cy.get('[data-cy="link/favoritos"] > .chakra-text').click()
        //Clica em Favoritar na seção Canais Favoritos e Procurar pelo Time Desejado
        cy.get('[data-cy="btn-favorite-channel"]').click()
        cy.get('[data-cy="input-search-channels"]').type(canal_favorito)
        //Clica em Add o Time Desejado aos Favorits e Salva 
        cy.get('.css-1bntj9o > .chakra-button').first().click()
        cy.get('[data-cy="btn-submit-channels"]').click()
        // Checando se o time favorito agora aparece no Canais Favoritos
        cy.get('.css-1qq2lpt').contains(canal_favorito)
        //Removendo o Time Selecionado do Times Favoritos
        cy.get('[data-cy="btn-edit-channels"]').click()
        cy.get('.css-alg8wq > .css-1bntj9o > .chakra-button').click({ force: true })
        cy.get('[data-cy="btn-submit-channels"]').click()
    })



})