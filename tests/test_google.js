const {By, Key, Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test_case(){
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        
        await driver.get("https://www.google.com");

        let acceptButton = await driver.wait(until.elementLocated(By.css('.QS5gu.sy4vM')), 5000);
        if (acceptButton) {
            await acceptButton.click();
        } else {
            console.log('Bouton tout accepter pas trouvée');
        }

        let searchBox = await driver.findElement(By.name("q"));
        await searchBox.sendKeys("Spider Man", Key.RETURN);

        await driver.wait(until.titleContains("Spider Man"), 10000);

        let title = await driver.getTitle();
        console.log(title);
        console.log('------------');
        console.log("Test passed: Google search works correctly.");
    } catch(e) {
        console.error("Test failed:", e);
    } finally {
        await driver.quit();
        
        
    setInterval(function(){
        driver.quit();
    }, 10000);
        
    }
}

test_case();