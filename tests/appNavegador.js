const { Builder, Browser, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const { Actions } = require("selenium-webdriver");


describe('Aplicação local - Central de Atendimento ao Cliente TAT', function () {

    let driver;


    beforeEach(async function () {
        //Instanciando navegador 
        driver = await new Builder().forBrowser(Browser.CHROME).build();

        // Configura opções do Chrome para o modo headless
        //let chromeOptions = new chrome.Options();
        //chromeOptions.addArguments("--headless"); // Configuração para o modo headless

        // Inicializando o driver do Selenium
        //driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

        //Navegando pela aplicação 
        await driver.get("https://demo.automationtesting.in/Register.html")
    });

    afterEach(async function () {
        //Fechando o navegador 
        // await driver.quit();
    });

    it('01 - Pressiona o botão voltar do navegador, depois pressiona o avançar e depois o atualizar', async function () {
        let botaoElement = await driver.findElement(By.xpath('//*[@id="header"]/nav/div/div[2]/ul/li[10]/a'));

        await botaoElement.click();

        await driver.sleep(3000);

        //Pressionando o botão Voltar do navegador:
        await driver.navigate().back();

        await driver.sleep(3000);

        //Pressionando o botão Avançar do navegador:
        await driver.navigate().forward();

        await driver.sleep(3000);

        //Atualizando a página atual:
        await driver.navigate().refresh();

    })

    it.only('02 - Clicando em um menu suspenso', async function () {

        // Encontrando o botão que abre o menu suspenso
        let button = await driver.findElement(By.className('dropdown-toggle'));

        // Clicando no botão para abrir o menu suspenso
        await button.click();

        //Aguardando o menu suspenso aparecer
        await driver.manage().setTimeouts({ implicit: 5000 });

        // Encontrando a opção do menu suspenso que deseja clicar
        let menuOption = await driver.findElement(By.xpath('//*[@id="header"]/nav/div/div[2]/ul/li[4]/ul/li[1]/a'));

        // Clicando na opção do menu suspenso
        await menuOption.click();

    })
});
