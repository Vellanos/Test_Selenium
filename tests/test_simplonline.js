const { By, Key, Builder, until } = require("selenium-webdriver");
const credentials = require('../credentials');
require("chromedriver");

(async function testSimplonline() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        console.log("Ouverture de Simplonline");
        await driver.get('https://simplonline.co');

        console.log("Clic sur le bouton 'Accepter et continuer'");
        let acceptButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Accepter et continuer')]")), 10000);
        await acceptButton.click();

        console.log("Saisie de l'email");
        let emailInput = await driver.wait(until.elementLocated(By.css('input[type="text"][name="email"]')), 10000);
        await emailInput.sendKeys(credentials.username);

        console.log("Saisie du mot de passe");
        let passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys(credentials.password);

        console.log("Clic sur le bouton de connexion");
        let loginBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Se connecter')]")), 10000);
        await loginBtn.click();

        console.log("Attente de la connexion réussie");
        await driver.wait(until.elementLocated(By.xpath("//span[contains(., 'bienvenue')]")), 15000);
        console.log("Connexion réussie");

        console.log("Navigation vers la page des briefs Simplonline");
        let briefElement = await driver.wait(until.elementLocated(By.xpath("//h2[contains(., 'Selenium Sandbox')]")), 10000);
        await briefElement.click();

        console.log("Clic sur le bouton 'Options'");
        let optionsBtn = await driver.wait(
            until.elementLocated(By.xpath("//*[text()='Options']"))
        );
        await optionsBtn.click();
        console.log("Bouton 'Options' cliqué avec succès");

        console.log("Clic sur l'option 'Rendu à soumettre'");
        let submitOption = await driver.wait(
            until.elementLocated(By.css("[data-key='submitIndividualWork']"))
        );
        await submitOption.click();
        console.log("Option 'Rendu à soumettre' cliquée avec succès");

        console.log("Clic sur le bouton 'Soumettre un rendu'");
        let submitBtn = await driver.wait(
            until.elementLocated(By.xpath("//*[text()='Soumettre un rendu']"))
        );
        await submitBtn.click();
        console.log("Bouton 'Soumettre un rendu' cliqué avec succès");

        console.log("Saisie du lien GitHub");
        let githubInput = await driver.wait(
            until.elementLocated(By.css('input.sc-12218616-0.eneWwx')),
            10000
        );
        await githubInput.sendKeys("https://github.com/Vellanos/Test_Selenium");
        console.log("Lien GitHub saisi avec succès");

        console.log("Clic sur le bouton 'Ajouter'");
        let addBtn = await driver.wait(
            until.elementLocated(By.css('button.sc-9f43adf8-0.egdvqs')),
            10000
        );
        await addBtn.click();
        console.log("Bouton 'Ajouter' cliqué avec succès");

        console.log("Tabulation trois fois");
        await driver.actions().sendKeys(Key.TAB, Key.TAB, Key.TAB).perform();
        
        console.log("Saisie du message");
        let message = " Ceci est un message de rendu envoyé par Selenium";
        for (let i = 0; i < message.length; i++) {
            await driver.actions().sendKeys(message.charAt(i)).perform();
            await driver.sleep(50);
        }

        console.log("Tabulation deux fois");
        await driver.actions().sendKeys(Key.TAB, Key.TAB).perform();

        console.log("Appui sur Entrée");
        await driver.actions().sendKeys(Key.ENTER).perform();

        let messageElement = await driver.wait(until.elementLocated(By.css(".sc-6a4c5dd9-0")), 10000);
        let messageText = await messageElement.getText();

        if (messageText.includes("Ceci est un message de rendu envoyé par Selenium")) {
            console.log("Test réussi");
        } else {
            console.log("Message de rendu incorrect");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await driver.quit();
        console.log("Navigateur fermé");
    }
}());   