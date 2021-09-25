
const puppeteer = require('puppeteer')
const fs = require('fs')
require('dotenv').config();

const dir = 'tmp'
const tagOption = {
  github: {
    tagUsername: 'input[name=login]',
    tagPassword: 'input[name=password]',
    tagSubmit: 'input[type=submit]'
  },
  gitlab: {
    tagUsername: '#user_login',
    tagPassword: '#user_password',
    tagSubmit: 'input[type=submit]'
  }
}


const generateFilePath = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  return `${dir}/${Date.now()}${Math.random()}.png`
}

const screenshot = async (url, git, host) => {
  const option = tagOption[git]
  let filePath = generateFilePath()
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-web-security'] })
  const page = await browser.newPage()
  await page.setViewport({ height: 1280, width: 1080 })
  await page.goto(url, { waitUntil: 'load' })
  if (await page.$(option.tagUsername) !== null) {
    await page.type(option.tagUsername, process.env.ACCOUNT)
    await page.type(option.tagPassword, Buffer.from(process.env.PASSWORD, 'base64').toString())
    await Promise.all([
      page.click(option.tagSubmit),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ])
  }
  if (await page.url() === url) await page.screenshot({ path: filePath })
  else filePath = null
  await browser.close()
  return host +'/'+ filePath
}

module.exports = screenshot