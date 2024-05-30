const { By, Key, Builder, until } = require('selenium-webdriver');
const assert = require('assert');

(async function test_github() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://github.com/login');
        await driver.findElement(By.id('login_field')).sendKeys('fakeusername');
        await driver.findElement(By.id('password')).sendKeys('fakepassword', Key.RETURN);

        await driver.wait(until.titleIs('Sign in to GitHub · GitHub'), 10000);
        let title = await driver.getTitle();
        assert.strictEqual(title, 'Sign in to GitHub · GitHub');

        let errorMsg = await driver.findElement(By.css('.flash-error')).getText();
        assert(errorMsg.includes('Incorrect username or password.'));
        console.log('Incorrect username or password.');
    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();

        /*
        setInterval(function(){
            driver.quit();
        }, 10000);
        */
    }
})();