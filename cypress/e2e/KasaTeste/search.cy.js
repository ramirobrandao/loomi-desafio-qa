/// <reference types="cypress" />

beforeEach(() => {
    cy.login('ramirobrandao@outlook.com', '123456')
})

const baseUrl = 'https://www.kasa.live/'
const time = "Real Madrid" // Time Existente 
const campeonato = "Campeonato Australiano" // Campeonato Existente
const canal = "CazéTV" // Canal Existente 
const data1 = "25" // Dia no mes atual
const data2 = '30' // Dia no mes atual


describe('Teste Funcional de Busca', () => {

    it("Busca Por Nome De Time ", () => {
        //Abre o Site 
        cy.visit(baseUrl)
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        //Realiza a busca por time  
        cy.get('#filter-team').click().type(time)
        cy.get('[aria-expanded="true"] > :nth-child(2) > .chakra-popover__popper > #popover-content-custom-popover > #popover-body-custom-popover').contains(time).click()
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        // Abre o primeiro card de partida do Time pesquisado
        cy.get('.css-shtkpc').contains(time).first().click()
        //Checando URL tem Busca
        cy.url().should('contains', 'busca') // Retorna as Partidas ou Mensagem sem Partidas no sistema para o time 
    });


    it("Busca Partida por Campeonato", () => {
        //Abre o Site e Buca pelo Campeonato com Jogo
        cy.visit(baseUrl)
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')

        cy.get('#filter-championship').click().type(campeonato)
        cy.get('[aria-expanded="true"] > :nth-child(2) > .chakra-popover__popper > #popover-content-custom-popover > #popover-body-custom-popover').contains(campeonato).click()

        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/championship/?name=A-League&page=1').as('carregamento')
        cy.wait('@carregamento')

        // Abre o primeiro card de partida do Campeonato pesquisado
        cy.get('.css-shtkpc').contains(campeonato).first().click()
        //Checando URL tem Busca
        cy.url().should('contains', 'busca')
    });


    it("Busca Partida por Canal de Transmissão", () => {
        //Abre o Site 
        cy.visit(baseUrl)
        // Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        //Buca pelo Canal de Transmissão 
        cy.get('#filter-streaming').click().type(canal)
        cy.get('[aria-expanded="true"] > :nth-child(2) > .chakra-popover__popper > #popover-content-custom-popover > #popover-body-custom-popover').contains(canal).click()
        // Espera o Carregamento da Pagin
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        //Checando URL
        cy.get('.css-shtkpc').contains('Partidas', { matchCase: false })
        cy.url().should('contains', 'busca')
    });


    it("Busca Partida por Dia Atual até Data Selecionada ", () => {
        //Abre o Site 
        cy.visit(baseUrl)
        // Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        //Busca Pela Data atula e a Data Selecionada
        cy.get('.chakra-input__group > .chakra-input').click()
        cy.get('.css-8atqhb > #popover-trigger-custom-popover > .chakra-portal > .chakra-popover__popper > #popover-content-custom-popover > #popover-body-custom-popover').contains(data1).click()
        cy.get('.css-n0tora').click()
        //Checando URL
        cy.url().should('contains', 'busca') // Retorna as Partidas ou Mensagem sem Partidas no sistema para o time 
    })


    it("Busca Partida por Perido de Datas Selecionada ", () => {
        //Abre o Site
        cy.visit(baseUrl)
        // Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        // Buca Pelo Periodo de Data Selecionado
        cy.get('.chakra-input__group > .chakra-input').click()
        cy.get('.css-8atqhb > #popover-trigger-custom-popover > .chakra-portal > .chakra-popover__popper > #popover-content-custom-popover > #popover-body-custom-popover').contains(data1).click()
        cy.get('.css-8atqhb > #popover-trigger-custom-popover > .chakra-portal > .chakra-popover__popper > #popover-content-custom-popover > #popover-body-custom-popover').contains(data1).click()
        cy.get('.css-8atqhb > #popover-trigger-custom-popover > .chakra-portal > .chakra-popover__popper > #popover-content-custom-popover > #popover-body-custom-popover').contains(data2).click()
        cy.get('.css-n0tora').click()
        //Checando URL
        cy.url().should('contains', 'busca') // Retorna as Partidas ou Mensagem sem Partidas no sistema para o time 
    })

})