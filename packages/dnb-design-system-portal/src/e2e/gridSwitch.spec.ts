import { test, expect, type Page } from '@playwright/test'
import waitForApp from './shared/waitForApp'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

test.describe('Grid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/web/components/')

    // Check if app is mounted
    await waitForApp(page)
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

  test('font weight example grid is dimmed in dark mode', async ({
    page,
  }) => {
    await page.goto('/web/typography/font-weight')
    await waitForApp(page)
    await page.evaluate(() => {
      window.localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ brand: 'ui', colorScheme: 'dark' })
      )
    })
    await page.reload()
    await waitForApp(page)

    const grid = page.locator('.typography-box').first()
    const opacity = await grid.evaluate((element) => {
      const style = getComputedStyle(element)

      return {
        lines: Number(style.getPropertyValue('--grid-opacity')),
        boldLines: Number(style.getPropertyValue('--grid-opacity-bold')),
      }
    })

    expect(opacity.lines).toBeLessThanOrEqual(0.05)
    expect(opacity.boldLines).toBeLessThanOrEqual(0.1)
  })
})
