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

        //Acessando componente 
        let todoText = await driver.findElement(By.xpath("/html/body/div/div/h2")).getText()

        //Verificando se o texto do componente é igual a "LambdaTest Sample App"
        assert.strictEqual(todoText, "LambdaTest Sample App");

        //Fechando o navegador
        await driver.quit()
    });

});

