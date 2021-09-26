
const puppeteer = require('puppeteer')
const fs = require('fs');
const dir = require('./dir');
require('dotenv').config();

const tagOption = {
  github: {
    tagUsername: '#login_field',
    tagPassword: '#password',
    tagSubmit: '[name="commit"]'
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

const gitLogin = async (page, git) => {
  const option = tagOption[git]
  if (await page.$(option.tagUsername) !== null) {
    await page.type(option.tagUsername, process.env.ACCOUNT)
    await page.type(option.tagPassword, Buffer.from(process.env.PASSWORD, 'base64').toString())
    await page.click(option.tagSubmit)
    console.log('logging ...');
    await page.waitForNavigation()
  }
}

const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
  '--disable-web-securit'
]

const blocked_domains = [
  'googlesyndication.com',
  'adservice.google.com',
];

const screenshot = async (url, git, host) => {
  let filePath = generateFilePath()
  const browser = await puppeteer.launch({ args: minimal_args })
  const page = await browser.newPage()
  page.on('request', request => {
    const url = request.url()
    if (blocked_domains.some(domain => url.includes(domain))) {
      request.abort();
    } else {
      request.continue();
    }
  });
  await page.setBypassCSP(true)
  await page.setViewport({ height: 1280, width: 1080 })
  await page.setRequestInterception(true);
  await page.goto(url, { waitUntil: 'load' })
  if (git) await gitLogin(page, git)
  console.log(await page.url());
  await page.screenshot({ path: filePath })
  // if (await page.url() === url) await page.screenshot({ path: filePath })
  // else filePath = null
  await browser.close()
  return filePath ? host + '/' + filePath : null
}

module.exports = screenshot