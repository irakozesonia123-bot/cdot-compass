/**
 * Dev-only screenshot helper. Drives the locally-installed Chrome via
 * puppeteer-core to capture the running app. Not part of the app bundle.
 *
 * Usage: start `npm run dev`, then `node scripts/screenshot.mjs <url> <name>`.
 */
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../screenshots')
mkdirSync(OUT, { recursive: true })

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const path = process.argv[2] ?? '/'
const name = process.argv[3] ?? 'page'
const url = `http://localhost:5173${path}`

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

/** Scroll through the page so IntersectionObserver-based reveals all fire. */
async function revealAll(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 250))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 400))
  })
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

try {
  const page = await browser.newPage()

  // Desktop
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {})
  await wait(2500)
  await page.screenshot({ path: resolve(OUT, `${name}-desktop-fold.png`), fullPage: false })
  await revealAll(page)
  await wait(800)
  await page.screenshot({ path: resolve(OUT, `${name}-desktop-full.png`), fullPage: true })

  // Mobile
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
  await page.reload({ waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {})
  await wait(2500)
  await revealAll(page)
  await wait(800)
  await page.screenshot({ path: resolve(OUT, `${name}-mobile-full.png`), fullPage: true })

  console.log(`Saved screenshots for ${url} to ${OUT}`)
} finally {
  await browser.close()
}
