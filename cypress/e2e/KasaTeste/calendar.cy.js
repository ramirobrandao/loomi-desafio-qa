/// <reference types="cypress" />



beforeEach(()=>
{
    cy.login('yajomos629@wuzak.com','123456')
})

const baseUrl = 'https://www.kasa.live/'
const time_com_jogo = "Arsenal" // Time Com Proximp Jogo
const campeonato_com_jogo = 'Premier League' // Campeonato com Jogo



describe('Teste Funcional Da Aba Calendario', () => {

    it ("Adicionar Partida ao Calendario ", () => {
        //Abre o Site 
        cy.visit(baseUrl)
        //Espera o Carregamento da Pagina
        cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
        cy.wait('@carregamento')
        //ealiza a Busca de time com proximo jogo
        cy.get('#filter-team').click().type(time_com_jogo)
        cy.get('#filter-team').click().type(' {enter}',{delay : 1000})

        //Abre o Card da Partida e Adiciona ao Calendario 
        cy.get('.css-tki4ir > :nth-child(1)').contains(time_com_jogo).click()
        cy.get('.css-17gh0kn > [aria-label="Adicionar ao calendário"] > .chakra-image').click()
        //Pegar a Data da Partida e salva em uma constante data
        cy.get('.css-ksg3v5 > .chakra-text').then(($btn)=>{
            const data =$btn.text()
            //Fecha o Card e Vai pra Aba Calendario
            cy.get('.chakra-modal__close-btn').click()
            cy.get('[data-cy="link/calendario"] > .chakra-text').click()
            //Filtra o Calendario Pro Data da Partida
            cy.get('.css-6rllw8').click()
            cy.get('.css-b9kogs').contains(data).click()
        })
        //Verifica se o Calendario Apresenta Card da Partida e Clica no Card
        cy.get('.rbc-time-content').contains(time_com_jogo).click()
        //Remove o Card do Calendario e Verifica se foi removido
        cy.get('.css-19nzcwv').click()
        cy.get('.css-1rcg3rs').click({force: true})
        cy.get('[data-cy="alert-dialog-submit"]').click()
        cy.get('.rbc-time-content').contains(time_com_jogo).should('not.exist')
        }) 
    

        it ("Buscar Partida No Calendario por Time ", () => {
           //Abre o Site e Realiza a Busca de time com proximo jogo
            cy.visit(baseUrl)
            //Espera o Carregamento da Pagina
            cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
            cy.wait('@carregamento')
            //Realiza a Busca de time com proximo jogo
            cy.get('#filter-team').click().type(time_com_jogo)
            cy.get('#filter-team').click().type(' {enter}', {delay : 1000})

            //Abre o Card da Partida e Adiciona ao Calendario
            cy.get('.css-tki4ir > :nth-child(1)').contains(time_com_jogo).click()
            cy.get('.css-17gh0kn > [aria-label="Adicionar ao calendário"] > .chakra-image').click()
            //Pegar a Data da Partida e salva em uma constante data
            cy.get('.css-ksg3v5 > .chakra-text').then(($btn)=>{
                const data =$btn.text()
                //Fecha o Card e Vai pra Aba Calendario
                cy.get('.chakra-modal__close-btn').click()
                cy.get('[data-cy="link/calendario"] > .chakra-text').click()
                //Filtra o Calendario Pro Data da Partida
                cy.get('.css-6rllw8').click()
                cy.get('.css-b9kogs').contains(data).click()
            })
            //Vai até o Filtro Times e Campeonatos depois seleciona opção Times e busca pelo Time escolhido 
            cy.get('.css-c85sb3 > .chakra-text').click()
            cy.get('[style="overflow: hidden; display: block; opacity: 1; height: auto;"]').contains('Times').click()
            cy.get('input[placeholder*="Pesquisar"]').first().type(time_com_jogo,{delay : 500})
            //Seleciona o Time E Confirma
            cy.get('[style="position: absolute; left: 0px; top: 134px; height: 57px; width: 100%;"] > .css-1lekzkb > .chakra-checkbox > .chakra-checkbox__control').click({force: true})
            cy.get('.css-g6z1zs > .chakra-button').click()
            //Fecha o Filtro de Busca por Times
            cy.get('[style="overflow: hidden; display: block; opacity: 1; height: auto;"]').contains('Times').click()
            //Verifica se o Calendario Apresenta Card da Partida e Clica no Card
            cy.get('.rbc-time-content').contains(time_com_jogo).click()
            //Remove o Card do Calendario e Verifica se foi removido
            cy.get('.css-19nzcwv').click()
            cy.get('.css-1rcg3rs').click({force: true})
            cy.get('[data-cy="alert-dialog-submit"]').click()
            cy.get('.rbc-time-content').contains(time_com_jogo).should('not.exist')
        })

        it ("Buscar Partida No Calendario por Campeonato ", () => {
            //Abre o Site e Realiza 
            cy.visit(baseUrl)
            //Espera o Carregamento da Pagina
            cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
            cy.wait('@carregamento')
            //Busca de Campeonato com proximo jogo
            cy.get('#filter-championship').click().type(campeonato_com_jogo,{delay : 500})
            cy.get('#filter-championship').click().type('{enter}'),
            //Abre o Card da Partida e Adiciona ao Calendario
            
            cy.intercept('https://kasalive.api.prod.loomi.com.br/api/1.0/user/favorite-matches/').as('carregamento')
            cy.wait('@carregamento')
            cy.get('.css-tki4ir > :nth-child(1)').contains(campeonato_com_jogo).click()
            cy.get('.css-17gh0kn > [aria-label="Adicionar ao calendário"] > .chakra-image').click()
            //Pegar a Data da Partida e salva em uma constante data
            cy.get('.css-ksg3v5 > .chakra-text').then(($btn)=>{
                const data =$btn.text()
                //Fecha o Card e Vai pra Aba Calendario
                cy.get('.chakra-modal__close-btn').click()
                cy.get('[data-cy="link/calendario"] > .chakra-text').click()
                //Filtra o Calendario Pro Data da Partida
                cy.get('.css-6rllw8').click()
                cy.get('.css-b9kogs').contains(data).click()
            })
            //Vai até o Filtro Times e Campeonatos depois seleciona opção Campeonato e busca pelo Campeonato escolhido 
            cy.get('.css-c85sb3 > .chakra-text').click()
            cy.get('[style="overflow: hidden; display: block; opacity: 1; height: auto;"]').contains('Campeonato').click()
            cy.get('input[placeholder*="Pesquisar"]').eq(1).type(campeonato_com_jogo,{delay : 500})    
            //Seleciona o Campeonato Desejado
            cy.get('[style="position: absolute; left: 0px; top: 0px; height: 80px; width: 100%;"] > .css-1lekzkb > .chakra-checkbox > .chakra-checkbox__control').click()
            //Verifica se o Calendario Apresenta Card da Partida e Clica no Card
            cy.get('.rbc-time-content').contains(campeonato_com_jogo).click()

            //Remove o Card do Calendario e Verifica se foi removido
            cy.get('.css-19nzcwv').click()
            cy.get('.css-1rcg3rs').click({force: true})
            cy.get('[data-cy="alert-dialog-submit"]').click()
            cy.get('.rbc-time-content').contains(campeonato_com_jogo).should('not.exist')
            cy.get('.css-1e3cmu9>.chakra-button').click()
            cy.get('.css-c85sb3 > .chakra-text').click()
    }) 
    
})
        



