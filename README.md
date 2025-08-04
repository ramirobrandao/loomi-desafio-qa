# Automação Kasalive 🤖

Automação de testes para o site Kasa.live utilizando Cypress e JavaScript. 

-Utilização de Custom Commands para maior flexibilidade e manutenção do código ✅/
Geração de relatórios ricos com gráficos e imagens utilizando a biblioteca do Mochawesome ✅/
-Implementação da biblioteca Faker para geração de massas de dados dinâmicas ⌛️/
-Utilização de variáveis de ambiente (env secrets) para proteger credenciais sensíveis, garantindo a segurança do código ⌛️/
-configurada uma pipeline (GitHub Actions) de integração contínua CI/CD 
que executa automaticamente todos os testes do projeto quando é realizado um push na branch main ou quando um pull request é aberto. ⌛️/
-Adoção de padrões consistentes de nomenclatura para commits ⌛️/

O projeto foi organizado usando estruturas Describe com cenários de sucesso e erro validando os principais fluxos do KasaLive: Login, Favoritar, Buscar Partidas, Melhores Momentos e Calendário.

## 📚 Documentação dos testes

- Acessar o link: [Documentação Kasa.live](https://github.com/ramirobrandao/loomi-desafio-qa/blob/master/docs/Documenta%C3%A7%C3%A3o%20KasaLive%20-%20BDD.pdf)

## 💻 Pré-requisitos

- NodeJS;
- Git;
- Cypress;
- IDE (Visual Studio Code);
- Material Icon Theme (Optional Plugin VSCode).
- Mochawesome

## 🛠️ Instalação
- Acessar o link [https://nodejs.org/](https://nodejs.org/), baixar e instalar o NodeJS versão 18 ou superior;
- Ao baixar o NodeJS, o gerenciador de pacotes NPM virá junto. 

Para verificar a instalação do NodeJS e do NPM, abrir o Prompt de Comando e digitar:

Para verificar a instalação do NodeJS (deve retornar a versão algo como v23.7.0):

``node -v `` 

Para verificar a instalação do gerenciador de pacoted NPM (deve retornar a versão algo como v11.1.0):

``npm -v ``
- Acessar o link [https://git-scm.com/downloads](https://git-scm.com/downloads), baixar e instalar o Git/GitBash;
 - No Windows Explorer, navegar até a pasta onde deseja clonar o projeto, abrir o GitBash (botão direito -> *Git Bash Here*) e digitar:

``git clone https://github.com/ramirobrandao/loomi-desafio-qa.git ``
 - Para que o Cypress funcione, é necessário que ele seja instalado atraves do *npm install* na pasta raiz do projeto
``npm install``

## 🚀 Execução dos testes

- No terminal do VSCode deve ser executado o seguinte comando para que o Cypress seja executado:

`` npx cypress open``

- No terminal do VSCode se optar por executar em modo headless digite o seguinte comando: 

`` npx cypress run``

## 📊 Relatórios 

- Depois da execução dos testes os relatórios das features podem ser acessados no seguinte diretório:

`` /cypress/reports/mochawesome-report/``