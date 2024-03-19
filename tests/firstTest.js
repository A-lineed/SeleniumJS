const { Builder, Browser, By, Key } = require("selenium-webdriver");
const assert = require("assert");


describe("Criação de tarefa", function(){
    it("Adicionando tarefa com sucesso", async function() {

    //Instanciando navegador 
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

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
