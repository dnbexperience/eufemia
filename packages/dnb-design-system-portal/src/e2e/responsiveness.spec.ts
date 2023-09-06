import { test, expect } from '@playwright/test'

test.describe('Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/')

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('change viewport size should add sidebar menu', async ({
    page,
    baseURL,
  }) => {
    await expect(page.locator('nav#portal-sidebar-menu')).toHaveCSS(
      'display',
      'block',
    )
    await page.setViewportSize({ width: 375, height: 667 }) // Set viewport size to iPhone 6 dimensions

    await expect(page.locator('nav#portal-sidebar-menu')).toHaveCSS(
      'display',
      'none',
    )
    await page.click('#toggle-sidebar-menu')

    await page.click(
      'nav#portal-sidebar-menu a[href="/uilib/about-the-lib/"]',
    )

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })

    expect(page.url()).toBe(`${baseURL}/uilib/about-the-lib/`)
    await expect(page.locator('h1')).toContainText('#About the library')
  })
})
