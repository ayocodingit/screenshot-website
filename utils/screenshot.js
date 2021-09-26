
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
  '--disable-web-security'
]

const blocked_domains = [
  'googlesyndication.com',
  'adservice.google.com',
];

const screenshot = async (url, host) => {
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
  await page.setViewport({ height: 1280, width: 1080 })
  await page.setRequestInterception(true);
  await page.goto(url, { waitUntil: 'load' })
  await page.screenshot({ path: filePath })
  await browser.close()
  return host + '/' + filePath
}

module.exports = screenshot