
import puppeteer from 'puppeteer'
import fs from 'fs';
import dir from './dir'

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

const screenshot = async (url: string): Promise <string | null> => {
  let filePath: string | null = generateFilePath()
  const browser = await puppeteer.launch({ args: args })
  const page = await browser.newPage()
  await page.setViewport({ height: 1280, width: 1280 })
  await page.goto(url, { waitUntil: 'load' })
  if (await page.url() === url || await page.$('input[name=login]') === null) await page.screenshot({ path: filePath })
  else filePath = null
  await browser.close()
  return filePath
}

export default screenshot