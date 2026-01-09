import type { Page } from '@playwright/test'
import { test, expect } from '@playwright/test'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

test.describe('Grid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib?data-visual-test')

    // Check if app is mounted
    await page.waitForSelector('#eufemia-portal-root', {
      state: 'attached',
    })
  })

  test('click on grid switch should enable the grid', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#switch-grid')
    await page.waitForSelector('html[show-dev-grid="true"]', {
      state: 'attached',
    })
    const elem = page.locator('html[show-dev-grid="true"]')
    expect(elem).toBeAttached()
  })
})
