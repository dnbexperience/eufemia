import { test, expect, Page } from '@playwright/test'
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
    await page.goto('/uilib?data-visual-test')

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('should have no preload link', async ({ page }) => {
    if (await isDev(page)) {
      return // stop here
    }

    expect(
      await page.locator('link[href^="/ui."][rel="preload"]').count(),
    ).toEqual(0)
  })

  test('should have one default theme loaded', async ({ page }) => {
    if (await isDev(page)) {
      return // stop here
    }

    expect(await page.locator('style[data-href^="/ui."]').count()).toEqual(
      1,
    )
  })

  test('should load css file', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(3)')

    await page.waitForSelector('link[href^="/sbanken."]', {
      state: 'attached',
    })
    expect(await page.locator('link[href^="/sbanken."]').count()).toEqual(
      1,
    )

    await page.waitForTimeout(100)

    expect(await page.locator('style[data-href^="/ui."]').count()).toEqual(
      0,
    )
  })

  test('should set local storage', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(3)')

    const localStorageData = await page.evaluate(() => {
      return JSON.parse(
        window.localStorage.getItem('eufemia-theme') || '{}',
      )
    })

    expect(localStorageData.name).toBe('sbanken')
  })

  test('should switch back and forth', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(3)')

    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:first-child')

    await page.waitForSelector('link[href^="/ui."][rel="stylesheet"]', {
      state: 'attached',
    })
    const uiCssFileCount = await page.$$eval(
      'link[href^="/ui."][rel="stylesheet"]',
      (elements) => elements.length,
    )
    expect(uiCssFileCount).toBe(1)

    const uiStyleElementExists = await page.$('style[data-href^="/ui."]')
    expect(uiStyleElementExists).toBeNull()
  })

  test('should load css file after template', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:nth-child(3)')

    const sbankenCssAfterTemplateExists = await page.$(
      '#eufemia-style-theme + link[href^="/sbanken."][rel="stylesheet"]',
    )
    expect(sbankenCssAfterTemplateExists).toBeTruthy()

    await page.click('#change-theme')
    await page.click('#change-theme-portal ul li:first-child')

    const uiCssAfterTemplateExists = await page.$(
      '#eufemia-style-theme + link[href^="/ui."][rel="stylesheet"]',
    )
    expect(uiCssAfterTemplateExists).toBeTruthy()
  })
})
