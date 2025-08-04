/// <reference types="cypress" />

beforeEach(() => {
    cy.login('ramirobrandao@outlook.com', '123456')
})

const baseUrl = 'https://www.kasa.live/'
const campeonato_com_jogo = 'Brasileirão Série A' // Campeonato com Jogos no Melhores Momentos
const time_com_jogo = 'Internacional' // Time que contém melhores moementos 



describe('Teste Funcional Melhores Momentos', () => {

    it("Reprodução Melhores Momentos ", () => {
        //Visita o Site 
        cy.visit(baseUrl)
        // Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        //Acessa Aba Melhores Momentos
        cy.get('[data-cy="link/melhores-momentos"]').click()
        //Clica no Primeiro Card de Melhor Momento
        cy.get(':nth-child(1) > .card-highlight-overlay').click()
        //Checando se o Player de Vídeo apareceu
        cy.get('.chakra-modal__content-container').should('exist')
        //Fechando o Player de Vídeo
        cy.get('.chakra-modal__close-btn > .chakra-image').click()
    });


    it("Filtrar Melhores Momentos Por Time ", () => {
        //Visita o Site
        cy.visit(baseUrl)
        // Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        //Acessa Aba Melhores Momentos
        cy.get('[data-cy="link/melhores-momentos"]').click()
        //Clica no Filtro de Times
        cy.get('.chakra-accordion').contains('Times').click()
        //Digita o time escolhido pela Constante no Input de Pesquisa e o Seleciona
        cy.get('.css-1qsvsm > .chakra-collapse').find('input').first().type(time_com_jogo)
        cy.get('.css-1lekzkb > .chakra-checkbox > .chakra-checkbox__control', { timeout: 5000 }).first().click()
        //Checa se aprece cards de melhores momentos com o time selecionado 
        cy.get('.css-1nti1bx').contains(time_com_jogo)
        cy.get('.css-g0nprg > .chakra-button').click()
    });



    it("Filtrar Melhores Momentos Por Campeonato ", () => {
        //Visita o Site 
        cy.visit(baseUrl)
        // Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        //Acessa Aba Melhores Momentos
        cy.get('[data-cy="link/melhores-momentos"]').click()
        //Clica no Filtro de Campeonato
        cy.get('.chakra-accordion').contains('Campeonato').click()
        //Digita o Campeonato definido no Input de Pesquisa e o Seleciona
        cy.get('.css-uifr2n > .chakra-collapse').find('input').first().type(campeonato_com_jogo)
        cy.get('[style="position: absolute; left: 0px; top: 0px; height: 60px; width: 100%;"] > .css-1lekzkb > .chakra-checkbox > .chakra-checkbox__control').click()
        //Checa se aprece cards de melhores momentos com o Campeonato selecionado 
        cy.get('.css-1nti1bx').contains(campeonato_com_jogo)
        cy.get('.css-g0nprg > .chakra-button').click()

        //Teste Dando Erro sendo que existe Melhores Momentos para O Campeonato Selecionado
        // Por Expleo ao escolher o Time Internacional aparece melhores Momentos do Brasileirão Serie A
        // Mas se Selecionamos o Melhores Momentos do Campeonato Brasileirão Serie A não me resulta em Melhores Momentos 
    });



})