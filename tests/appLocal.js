const { Builder, Browser, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const { Select } = require('selenium-webdriver');
const WebElement = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');



describe('Aplicação local - Central de Atendimento ao Cliente TAT', function () {

    let driver;


    beforeEach(async function () {
        //Instanciando navegador 
        //driver = await new Builder().forBrowser(Browser.CHROME).build();

        //Navegando pela aplicação 
        //await driver.get("file:///C:/Users/aline.franca/Documents/Automa%C3%A7%C3%A3o%20de%20testes/SeleniumJS/src/index.html")


        // Configura opções do Chrome para o modo headless
        let chromeOptions = new chrome.Options();
        chromeOptions.addArguments("--headless"); // Configuração para o modo headless

        // Inicializando o driver do Selenium
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

        await driver.get("file:///C:/Users/aline.franca/Documents/Automa%C3%A7%C3%A3o%20de%20testes/SeleniumJS/src/index.html")
    });

    afterEach(async function () {
        //Fechando o navegador 
        //await driver.quit();
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

    it('CT06** - Preenche os campos, limpa os campos e depois verifica se os campos estão vazios', async function () {

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
    });


    it('CT08 - seleciona um produto (YouTube) por seu texto', async function () {
        let listaSuspensa = await driver.findElement(By.id('product'));

        //instanciando objeto para uso da classe Select do selenium
        let select = new Select(listaSuspensa);

        //seleciona pelo texto visível
        select.selectByVisibleText('YouTube');

        await driver.sleep(500);
        // Obter o elemento da opção selecionada
        let valorSelecionadoElement = await select.getFirstSelectedOption();
        let valorSelecionado = await valorSelecionadoElement.getText();

        //Valida se o valor selecionado é igual a "YouTube"
        assert.equal(valorSelecionado, "YouTube");
    });

    it('CT09 - seleciona um produto (Mentoria) por seu valor', async function () {
        let listaSuspensa = await driver.findElement(By.id('product'));

        //instanciando objeto para uso da classe Select do selenium
        let select = new Select(listaSuspensa);

        //Seleciona pelo valor
        select.selectByValue('mentoria');

        await driver.sleep(500);
        // Obter o elemento da opção selecionada
        let valorSelecionadoElement = await select.getFirstSelectedOption();
        let valorSelecionado = await valorSelecionadoElement.getText();

        //Valida se o valor selecionado é igual a "Mentoria"
        assert.equal(valorSelecionado, "Mentoria");
    });

    it('CT10 - seleciona um produto (Blog) por seu índice', async function () {
        let listaSuspensa = await driver.findElement(By.id('product'));

        //instanciando objeto para uso da classe Select do selenium
        let select = new Select(listaSuspensa);

        // Seleciona pelo índice
        select.selectByIndex(1);

        await driver.sleep(500);
        // Obter o elemento da opção selecionada
        let valorSelecionadoElement = await select.getFirstSelectedOption();
        let valorSelecionado = await valorSelecionadoElement.getText();

        //Valida se o valor selecionado é igual a "Blog"
        assert.equal(valorSelecionado, "Blog");
    });

    it('CT11 - marca o tipo de atendimento "Feedback"', async function () {
        let radioBtn = await driver.findElement(By.xpath('//*[@id="support-type"]/label[4]/input'));

        // Verificar se o radio button está selecionado
        let selecionado = await radioBtn.isSelected();
        console.log('Selecionado antes de clicar:', selecionado);

        // Clica no radio button para marcá-lo
        await radioBtn.click();

        await driver.sleep(500);

        // Verifica se o radio button está selecionado após clicar
        selecionado = await radioBtn.isSelected();
        console.log('Selecionado após clicar:', selecionado);

        //Valida se o radio button selecionado tem o value "feedback"
        let valorSelecionado = await radioBtn.getAttribute('value');
        assert.strictEqual(valorSelecionado, 'feedback');

    });

    it('CT12 - marca cada tipo de atendimento', async function () {
        let radioAjuda = await driver.findElement(By.xpath('//*[@id="support-type"]/label[2]/input'));
        let radioElogio = await driver.findElement(By.xpath('//*[@id="support-type"]/label[3]/input'));
        let radioFeedback = await driver.findElement(By.xpath('//*[@id="support-type"]/label[4]/input'));

        // Verificar se o radio button está selecionado
        let selecionadoAjuda = await radioAjuda.isSelected();
        console.log('Ajuda - Selecionado antes de clicar:', selecionadoAjuda);
        let selecionadoElogio = await radioElogio.isSelected();
        console.log('Elogio - Selecionado antes de clicar:', selecionadoElogio);
        let selecionadoFeedback = await radioFeedback.isSelected();
        console.log('Feedback - Selecionado antes de clicar:', selecionadoFeedback);


        // Clica no radio button para marcá-lo
        await radioAjuda.click();
        await driver.sleep(500);
        selecionadoAjuda = await radioAjuda.isSelected();
        console.log('Ajuda - Selecionado depois de clicar:', selecionadoAjuda);

        await radioElogio.click();
        await driver.sleep(500);
        selecionadoElogio = await radioElogio.isSelected();
        console.log('Elogio - Selecionado depois de clicar:', selecionadoElogio);

        await radioFeedback.click();
        selecionadoFeedback = await radioFeedback.isSelected();
        console.log('Feedback - Selecionado depois de clicar:', selecionadoFeedback);
    });

    it('CT13 - marca ambos checkboxes, depois desmarca o último"', async function () {
        // Localiza o elemento do checkbox pelo ID
        let checkboxEmail = await driver.findElement(By.id('email-checkbox'));
        let checkboxTelefone = await driver.findElement(By.id('phone-checkbox'));

        // Verifica se o checkbox está marcado
        let marcadoEmail = await checkboxEmail.isSelected();
        console.log('Email - Marcado antes de clicar:', marcadoEmail);
        let marcadoTelefone = await checkboxTelefone.isSelected();
        console.log('Telefone - Marcado antes de clicar:', marcadoTelefone);

        // Clica no checkbox para marcá-lo
        await checkboxEmail.click();
        await checkboxTelefone.click();

        // Verifica se o checkbox está marcado após clicar
        marcadoEmail = await checkboxEmail.isSelected();
        console.log('Email - Marcado depois de clicar:', marcadoEmail);
        marcadoTelefone = await checkboxTelefone.isSelected();
        console.log('Telefone - Marcado depois de clicar:', marcadoTelefone);

        // Clica no checkbox para desmarcá-lo
        await checkboxTelefone.click();
        marcadoTelefone = await checkboxTelefone.isSelected();
        console.log('Telefone - Marcado depois de clicar:', marcadoTelefone);

    });

    it('CT14 - Seleciona o arquivo da pasta img', async function () {

        let fileInput = driver.findElement(By.id("file-upload"));

        let fileInputVazio = await fileInput.getAttribute("value");
        assert.strictEqual(fileInputVazio, "")

        await driver.sleep(500)

        await fileInput.sendKeys('C:\\Users\\aline.franca\\Documents\\Automação de testes\\SeleniumJS\\img\\Maintenance-amico.png');
        let uploadedFilePath = await fileInput.getAttribute("value");

        //console.log(uploadedFilePath)
        assert.strictEqual(uploadedFilePath, "C:\\fakepath\\Maintenance-amico.png")

    });


    it('CT15 - testa o título do link que abre em outro navegador', async function () {

        // Encontra o link que abre em uma nova aba
        let linkElement = await driver.findElement(By.xpath('//*[@id="privacy"]/a'));

        // Obtém a URL do link
        let linkUrl = await linkElement.getAttribute('href');

        // Abre o link em uma nova aba
        await driver.executeScript("window.open(arguments[0])", linkUrl);

        // Aguarda até que haja duas abas abertas
        await driver.wait(async function () {
            let handles = await driver.getAllWindowHandles();
            return handles.length === 2;
        }, 10000);

        // Muda o foco para a nova aba
        let handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);

        //Solicitando informação do navegador 
        let title = await driver.getTitle();

        //Validando se o título é igual ao texto
        assert.strictEqual(title, "Central de Atendimento ao Cliente TAT - Política de privacidade");

        // Fecha a nova aba
        await driver.close();

        // Muda o foco de volta para a primeira aba
        await driver.switchTo().window(handles[0]);

    });

})
