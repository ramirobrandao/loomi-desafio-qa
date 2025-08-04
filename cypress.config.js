const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    setupNodeEvents(on, config) {
      return config;
    },

    baseUrl: 'https://www.kasa.live/',
    reporter: 'mochawesome',
    screenshotOnRunFailure: true,  //gera print quando um teste falhar
    "reporterOptions": {
      "reportDir": "cypress/reports/mochawesome-report",
      "overwrite": false,
      "html": true,
      "json": true,
      "charts": true,
      "reportFilename": "report",
      "timestamp": "mmddyyyy_HHMMss",
      "inlineAssets": true,
      "toOpen": true,
      "reportPageTitle": "Relatório de execução de testes do Desafio",
      "embeddedScreenshots": true  //integrar prints no relatório
    }
  },
});
