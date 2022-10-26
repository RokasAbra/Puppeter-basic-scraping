const puppeteer = require('puppeteer')

const scrapeMedium = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://stackoverflow.com')

  const scrapedData = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        'd-flex'
      )
    )
      .filter(node => node.querySelector('.div'))
      .map(link => ({
        title: link.querySelector('.div').textContent,
        link: link.getAttribute('p')
      }))
  )

  await browser.close()
  return scrapedData
}

const scrapeYoutube = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://www.youtube.com/results?search_query=headless+browser'
  )

  const scrapedData = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.ytd-video-renderer #video-title'))
      .map(link => ({
        title: link.getAttribute('title'),
        link: link.getAttribute('href')
      }))
      .slice(0, 10)
  )


  await browser.close()
  return scrapedData
}

module.exports.scrapeMedium = scrapeMedium
module.exports.scrapeYoutube = scrapeYoutube