
const puppeteer = require('puppeteer')
const fs = require('fs');
const dir = require('./dir');
require('dotenv').config();

const generateFilePath = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  return `${dir}/${Date.now()}${Math.random()}.png`
}

const args = [
  '--no-sandbox',
  '--disable-web-security'
]

const screenshot = async (url) => {
  let filePath = generateFilePath()
  const browser = await puppeteer.launch({ args: args })
  const page = await browser.newPage()
  await page.setViewport({ height: 1280, width: 1280 })
  await page.goto(url, { waitUntil: 'load' })
  await page.screenshot({ path: filePath })
  await browser.close()
  return filePath
}

module.exports = screenshot