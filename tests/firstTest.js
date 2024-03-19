const {Builder, Browser} = require('selenium-webdriver');

async function example() {

//Instanciando navegador 
let driver = await new Builder().forBrowser(Browser.CHROME).build();


}
example()