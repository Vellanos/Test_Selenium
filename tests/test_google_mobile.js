const { By, Key, Builder, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('Google Search Test on Mobile (Validation Manual)', function() {
    this.timeout(30000);

    let driver;

    before(async function() {
        let options = new chrome.Options();
        options.setMobileEmulation({ deviceName: 'iPhone X' });

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    after(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('should search for a query on Google in mobile mode', async function() {
        await driver.get('https://www.google.com');

    
        let searchBox = await driver.wait(until.elementLocated(By.name('q')), 10000);

        await driver.wait(until.elementIsVisible(searchBox), 10000);

        await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);
        await driver.wait(until.titleContains('Selenium WebDriver'), 10000);

        let title = await driver.getTitle();
        console.log('Title is:', title);
        assert(title.includes('Selenium WebDriver'));
    });
});