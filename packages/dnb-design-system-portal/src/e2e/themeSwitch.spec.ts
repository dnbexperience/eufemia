import { test, expect, type Page } from '@playwright/test'
import isDev from './shared/isDev'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

test.describe('Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/?data-visual-test')

    // Check if app is mounted
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })
  })

  test('should have no preload link', async ({ page }) => {
    if (await isDev(page)) {
      return // stop here
    }

    expect(
      await page.locator('link[href^="/ui."][rel="preload"]').count()
    ).toEqual(0)
  })

  test('should have one default theme loaded', async ({ page }) => {
    if (await isDev(page)) {
      return // stop here
    }

    expect(await page.locator('style[data-href^="/ui."]').count()).toEqual(
      1
    )
  })

  test('should load css file', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(2)')

    await page.waitForSelector('link[href^="/sbanken."]', {
      state: 'attached',
    })
    expect(await page.locator('link[href^="/sbanken."]').count()).toEqual(
      1
    )

    await page.waitForTimeout(100)

    expect(await page.locator('style[data-href^="/ui."]').count()).toEqual(
      0
    )
  })

  test('should set local storage', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(2)')

    const localStorageData = await page.evaluate(() => {
      return JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}'
      )
    })

    expect(localStorageData.name).toBe('sbanken')
  })

  test('should switch back and forth', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(2)')

    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:first-child')

    await page.waitForSelector('link[href^="/ui."][rel="stylesheet"]', {
      state: 'attached',
    })
    const uiCssFileCount = await page.$$eval(
      'link[href^="/ui."][rel="stylesheet"]',
      (elements) => elements.length
    )
    expect(uiCssFileCount).toBe(1)

    const uiStyleElementExists = await page.$('style[data-href^="/ui."]')
    expect(uiStyleElementExists).toBeNull()
  })

  test('should load css file after template', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(2)')

    const sbankenCssAfterTemplateExists = await page.$(
      '#eufemia-style-theme + link[href^="/sbanken."][rel="stylesheet"]'
    )
    expect(sbankenCssAfterTemplateExists).toBeTruthy()

    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:first-child')

    const uiCssAfterTemplateExists = await page.$(
      '#eufemia-style-theme + link[href^="/ui."][rel="stylesheet"]'
    )
    expect(uiCssAfterTemplateExists).toBeTruthy()
  })
})

test.describe('Dark mode', () => {
  const url = '/uilib/components/?data-visual-test'

  async function gotoAndWait(page: Page) {
    await page.goto(url)
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })
  }

  async function setColorScheme(page: Page, colorScheme: string) {
    await page.evaluate((scheme) => {
      const existing = JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}'
      )
      window.localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ ...existing, colorScheme: scheme })
      )
    }, colorScheme)
  }

  test('should apply dark color scheme class to body', async ({
    page,
  }) => {
    await gotoAndWait(page)
    await setColorScheme(page, 'dark')
    await page.reload()
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })

    const hasDarkClass = await page.evaluate(() =>
      document.body.classList.contains('eufemia-theme__color-scheme--dark')
    )
    expect(hasDarkClass).toBe(true)
  })

  test('should apply light color scheme class by default', async ({
    page,
  }) => {
    await gotoAndWait(page)

    const hasLightClass = await page.evaluate(() =>
      document.body.classList.contains(
        'eufemia-theme__color-scheme--light'
      )
    )
    expect(hasLightClass).toBe(true)
  })

  test('should set local storage for dark mode', async ({ page }) => {
    await gotoAndWait(page)
    await setColorScheme(page, 'dark')
    await page.reload()
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })

    const localStorageData = await page.evaluate(() => {
      return JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}'
      )
    })

    expect(localStorageData.colorScheme).toBe('dark')
  })

  test('should switch between dark and light', async ({ page }) => {
    await gotoAndWait(page)
    await setColorScheme(page, 'dark')
    await page.reload()
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })

    const hasDarkClass = await page.evaluate(() =>
      document.body.classList.contains('eufemia-theme__color-scheme--dark')
    )
    expect(hasDarkClass).toBe(true)

    // Switch to light
    await setColorScheme(page, 'light')
    await page.reload()
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })

    const hasLightClass = await page.evaluate(() =>
      document.body.classList.contains(
        'eufemia-theme__color-scheme--light'
      )
    )
    expect(hasLightClass).toBe(true)

    const hasDarkClassAfterSwitch = await page.evaluate(() =>
      document.body.classList.contains('eufemia-theme__color-scheme--dark')
    )
    expect(hasDarkClassAfterSwitch).toBe(false)
  })

  test('should respect system preference with auto', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await gotoAndWait(page)
    await setColorScheme(page, 'auto')
    await page.reload()
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })

    const hasDarkClass = await page.evaluate(() =>
      document.body.classList.contains('eufemia-theme__color-scheme--dark')
    )
    expect(hasDarkClass).toBe(true)
  })

  test('should apply dark class before React hydration (FOUC prevention)', async ({
    page,
  }) => {
    await gotoAndWait(page)
    await setColorScheme(page, 'dark')

    // Record body class at DOMContentLoaded, before React hydration
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        globalThis.__bodyClassAtDCL = document.body.className
      })
    })

    await page.reload()
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })

    const bodyClassAtDCL = await page.evaluate(
      () => globalThis.__bodyClassAtDCL
    )
    expect(bodyClassAtDCL).toContain('eufemia-theme__color-scheme--dark')
  })
})
