const { Builder, Browser, By, Key } = require("selenium-webdriver");
const assert = require("assert");


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

    it.only('01 - Pressiona o botão voltar do navegador, depois pressiona o avançar e depois o atualizar', async function () {
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
});
