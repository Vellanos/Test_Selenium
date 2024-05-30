const { By, Key, Builder, until } = require("selenium-webdriver");
const assert = require("assert");

function getRandomDestination() {
    const destinations = ["Paris, France", "New York, USA", "Tokyo, Japan", "London, UK", "Rome, Italy"];
    return destinations[Math.floor(Math.random() * destinations.length)];
}

function getRandomDates() {
    const start = new Date();
    start.setDate(start.getDate() + Math.floor(Math.random() * 30) + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + Math.floor(Math.random() * 10) + 1);
    return { start, end };
}

function getRandomTravelers() {
    return Math.floor(Math.random() * 4) + 1;
}

(async function test() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        console.log("Go to Airbnb");
        await driver.get('https://www.airbnb.com');

        console.log("Wait for page load");
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log("Accept cookies");
        let cookieBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'OK')]")), 10000);
        await cookieBtn.click();

        let destination = getRandomDestination();
        let city = destination.split(',')[0];

        console.log(`Search for: ${destination}`);
        let searchInput = await driver.wait(until.elementLocated(By.css('[name="query"]')), 10000);
        await searchInput.sendKeys(destination, Key.RETURN);

        let { start, end } = getRandomDates();
        console.log(`Select dates: ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`);

        await driver.wait(until.elementLocated(By.css('[data-testid="structured-search-input-field-split-dates-0"]')), 10000);

        let startDay = start.getDate();
        let startMonth = start.getMonth() + 1;
        let startYear = start.getFullYear();
        let startSel = `[data-testid="calendar-day-${String(startDay).padStart(2, '0')}/${String(startMonth).padStart(2, '0')}/${startYear}"]`;
        await driver.wait(until.elementLocated(By.css(startSel)), 10000);
        let startElem = await driver.findElement(By.css(startSel));
        await startElem.click();

        let endDay = end.getDate();
        let endMonth = end.getMonth() + 1;
        let endYear = end.getFullYear();
        let endSel = `[data-testid="calendar-day-${String(endDay).padStart(2, '0')}/${String(endMonth).padStart(2, '0')}/${endYear}"]`;
        await driver.wait(until.elementLocated(By.css(endSel)), 10000);
        let endElem = await driver.findElement(By.css(endSel));
        await endElem.click();

        console.log(`Selected dates: ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`);

        await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'lk4ruxu') and text()='Voyageurs']")), 10000);

        let travelers = getRandomTravelers();
        console.log(`Select travelers: ${travelers}`);

        let addTravelerBtn = await driver.findElement(By.xpath("//div[contains(@class, 'p1m42al0') and text()='Ajouter des voyageurs']"));
        await addTravelerBtn.click();

        await driver.wait(until.elementLocated(By.css('[data-testid="stepper-adults-increase-button"]')), 10000);

        for (let i = 0; i < travelers - 1; i++) {
            let increaseBtn = await driver.findElement(By.css('[data-testid="stepper-adults-increase-button"]'));
            await increaseBtn.click();
        }

        await driver.wait(until.elementLocated(By.css('[data-testid="structured-search-input-search-button"]')), 10000);

        console.log("Click search button");
        let searchBtn = await driver.findElement(By.css('[data-testid="structured-search-input-search-button"]'));
        await searchBtn.click();

        console.log("Wait for results");
        await driver.wait(until.elementLocated(By.xpath(`//div[contains(text(), '${city}')]`)), 20000);
        let destDisplayed = await driver.findElement(By.xpath(`//div[contains(text(), '${city}')]`)).getText();

        assert.strictEqual(destDisplayed.includes(city), true);
        console.log(`Destination found: ${destDisplayed}`);

    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
        console.log("Browser closed.");
    }
}());