import { test, expect, Page } from '@playwright/test'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

test.describe('Colors for UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/quickguide-designer/colors?data-visual-test&eufemia-theme=ui',
    )

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('table should have correct color', async ({ page }) => {
    await expect(
      page.locator('.dnb-table__scroll-view table tbody tr td').first(),
    ).toHaveCSS('color', 'rgb(0, 114, 114)')

    const lastCellText = await page.textContent(
      '.dnb-table__scroll-view table tbody tr td:last-of-type',
    )
    expect(lastCellText).toContain('--color-sea-green')
  })
})

test.describe('Colors for Sbanken', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/quickguide-designer/colors?data-visual-test&eufemia-theme=sbanken',
    )

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('table should have correct color', async ({ page }) => {
    await expect(
      page.locator('.dnb-table__scroll-view table tbody tr td').first(),
    ).toHaveCSS('color', 'rgb(28, 27, 78)')

    const lastCellText = await page.textContent(
      '.dnb-table__scroll-view table tbody tr td:last-of-type',
    )
    expect(lastCellText).toContain('--sb-color-purple')
  })
})
