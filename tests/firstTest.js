const { Builder, Browser, By, Key } = require("selenium-webdriver");
const assert = require("assert");


describe("Aplicação da web", function () {
    it("Adiciona tarefa", async function () {

        //Instanciando navegador 
        const driver = await new Builder().forBrowser(Browser.CHROME).build();

        //Navegando pela aplicação 
        await driver.get("https://lambdatest.github.io/sample-todo-app/")

        //Primeiro teste - Preenchendo campo 
        await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);

        //assert 
        let todoText = await driver.findElement(By.xpath("/html/body/div/div/h2")).getText()

        //assert using node assertion 
        assert.strictEqual(todoText, "LambdaTest Sample App");

        //Fechando o navegador
        await driver.quit()
    });

});


describe('Aplicação local - Central de Atendimento ao Cliente TAT', function () {
    it('Verifica o título da aplicação', async function () {

        //Instanciando navegador 
        const driver = await new Builder().forBrowser(Browser.CHROME).build();

        //Navegando pela aplicação 
        await driver.get("file:///C:/Users/aline.franca/Documents/Automa%C3%A7%C3%A3o%20de%20testes/SeleniumJS/src/index.html")

        //Solicitando informação do navegador 
        let title = await driver.getTitle();

        //Validando se variável é igual a "CAC TAT"
        assert.strictEqual(title, "Central de Atendimento ao Cliente TAT");

        //Fechando o navegador
        await driver.quit()
    })
})
