const { Builder, Browser, By, Key } = require("selenium-webdriver");
const assert = require("assert");



describe('Aplicação local - Central de Atendimento ao Cliente TAT', function () {

    let driver;

    beforeEach(async function () {
        //Instanciando navegador 
        driver = await new Builder().forBrowser(Browser.CHROME).build();

        //Navegando pela aplicação 
        await driver.get("file:///C:/Users/aline.franca/Documents/Automa%C3%A7%C3%A3o%20de%20testes/SeleniumJS/src/index.html")
    });

    afterEach(async function () {
        //Fechando o navegador 
        await driver.quit();
    });

    it('CT01 - Verifica o título da aplicação', async function () {

        //Solicitando informação do navegador 
        let title = await driver.getTitle();

        //Validando se variável é igual a "CAC TAT"
        assert.strictEqual(title, "Central de Atendimento ao Cliente TAT");
    })

    it('CT02 - Preenche os campos obrigatórios e envia o formulário', async function () {

        let textoLongo = "A família é o bem mais precioso que temos na vida. Ela é o alicerce que nos sustenta nos momentos difíceis e o refúgio de amor e alegria nos dias felizes. É onde aprendemos os valores que nos moldam e apoio incondicional em todas as jornadas que enfrentamos.";
        //Buscando pelos elementos
        let nome = await driver.findElement(By.id('firstName'));
        let sobrenome = await driver.findElement(By.id('lastName'));
        let email = await driver.findElement(By.id('email'));
        let textarea = await driver.findElement(By.id('open-text-area'))
        let botaoEnviar = await driver.findElement(By.className('button'));

        //Inserindo informação
        await nome.sendKeys('Aline');
        await sobrenome.sendKeys('Edvania');
        await email.sendKeys('aline.edvania@gmail.com');
        textarea.sendKeys(textoLongo);

        await driver.sleep(500);
        //Clicando no botão
        await botaoEnviar.click();

        //Acessando componente
        let successElement = await driver.findElement(By.className("success")).getText();
        //Verificando se o texto do componente é igual a "Mensagem enviada com sucesso."
        assert.strictEqual(successElement, "Mensagem enviada com sucesso.");
    })

    it('CT03 - Exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', async function () {
        //Buscanddo os componentes
        let nome = await driver.findElement(By.id('firstName'));
        let sobrenome = await driver.findElement(By.id('lastName'));
        let email = await driver.findElement(By.id('email'));
        let textarea = await driver.findElement(By.id('open-text-area'))
        let botaoEnviar = await driver.findElement(By.className('button'));

        //Inserindo informação
        await nome.sendKeys('Aline');
        await sobrenome.sendKeys('Edvania');
        await email.sendKeys('aline.edvania');
        await textarea.sendKeys('Teste');

        await driver.sleep(500);

        //Clicando no botão
        await botaoEnviar.click();

        //Acessando componente
        let errorElement = await driver.findElement(By.className("error")).getText();

        //Verificando se o texto do componente é igual a "Mensagem enviada com sucesso."
        assert.strictEqual(errorElement, "Valide os campos obrigatórios!");
    })

    it('CT04 - Campo telefone continua vazio quando inserido valor não-númerico', async function () {

        //Buscando pelo id do componente
        let telefone = await driver.findElement(By.id('phone'));

        //Inserindo informação
        await telefone.sendKeys('Ana');

        await driver.sleep(1000);

        //Inserindo valor do atributo a variável
        let valorCampo = await telefone.getAttribute('value');

        //Verificando se o campo está vazio
        assert.strictEqual(valorCampo, '');
    })

    it('CT05 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', async function () {

        let nome = await driver.findElement(By.id('firstName'));
        let sobrenome = await driver.findElement(By.id('lastName'));
        let email = await driver.findElement(By.id('email'));
        let textarea = await driver.findElement(By.id('open-text-area'));
        let checkboxTel = await driver.findElement(By.id('phone-checkbox'));
        let botaoEnviar = await driver.findElement(By.className('button'));

        await nome.sendKeys('Aline');
        await sobrenome.sendKeys('Edvania');
        await email.sendKeys('aline.edvania');
        await textarea.sendKeys('Teste');

        await checkboxTel.click();

        await driver.sleep(500);

        await botaoEnviar.click();

        let errorElement = await driver.findElement(By.className("error")).getText();

        await driver.sleep(500);

        assert.strictEqual(errorElement, "Valide os campos obrigatórios!");

    })

    it('CT 06** - Preenche os campos, limpa os campos e depois verifica se os campos estão vazios', async function () {

        let nome = await driver.findElement(By.id('firstName'));
        let sobrenome = await driver.findElement(By.id('lastName'));
        let email = await driver.findElement(By.id('email'));
        let telefone = await driver.findElement(By.id('phone'));
        let textarea = await driver.findElement(By.id('open-text-area'))

        await nome.sendKeys('Aline');
        await sobrenome.sendKeys('Edvania');
        await email.sendKeys('aline.edvania@gmail.com');
        await telefone.sendKeys('81 989680895')
        await textarea.sendKeys('Teste');

        await driver.sleep(500);

        await nome.clear();
        await sobrenome.clear();
        await email.clear();
        await telefone.clear();
        await textarea.clear();

        let valorNome = await telefone.getAttribute('value');
        let valorSobrenome = await telefone.getAttribute('value');
        let valorEmail = await telefone.getAttribute('value');
        let valorTelefone = await telefone.getAttribute('value');
        let valorTextarea = await telefone.getAttribute('value');

        assert.strictEqual(valorNome, "");
        assert.strictEqual(valorSobrenome, "");
        assert.strictEqual(valorEmail, "");
        assert.strictEqual(valorTelefone, "");
        assert.strictEqual(valorTextarea, "");
    })

    it('CT07 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', async function () {
        let botaoEnviar = await driver.findElement(By.className('button'));

        await botaoEnviar.click();

        let errorElement = await driver.findElement(By.className("error")).getText();

        await driver.sleep(500);

        assert.strictEqual(errorElement, "Valide os campos obrigatórios!");
    })


})
