const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://www.basketnews.lt");
    await page.screenshot({path: "mywebsite.png"});

    const grabtechnologies = await page.evaluate(() => {
        const techTags = document.querySelectorAll(".item.list_item a")
       let technologies = []
       techTags.forEach((tag) => {
        technologies.push(tag.innerText)
       });
       return technologies
    });
    console.log(grabtechnologies);
    await browser.close();
} )();

