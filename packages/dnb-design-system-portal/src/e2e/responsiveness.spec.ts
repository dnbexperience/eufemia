import { test, expect } from '@playwright/test'
import isVite from './shared/isVite'
import waitForApp from './shared/waitForApp'

test.describe('Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/')

    // Check if app is mounted
    await waitForApp(page)
  })

  test('change viewport size should add sidebar menu', async ({
    page,
  }) => {
    await expect(page.locator('nav#portal-sidebar-menu')).toHaveCSS(
      'display',
      'block'
    )
    await page.setViewportSize({ width: 375, height: 667 }) // Set viewport size to iPhone 6 dimensions

    await expect(page.locator('nav#portal-sidebar-menu')).toHaveCSS(
      'display',
      'none'
    )
    await page.click('#toggle-sidebar-menu')

    // Use a top-level sidebar link that is visible in the prerendered portal
    // Vite links have no trailing slash
    const sidebarLink = (await isVite(page))
      ? 'nav#portal-sidebar-menu a[href="/uilib/components"]'
      : 'nav#portal-sidebar-menu a[href="/uilib/about-the-lib/"]'
    await page.click(sidebarLink)

    // Check if app is mounted
    await waitForApp(page)

    if (await isVite(page)) {
      expect(page.url()).toContain('/uilib/components')
    } else {
      expect(page.url()).toContain('/uilib/about-the-lib/')
      await expect(page.locator('h1')).toContainText('#About the library')
    }
  })
})
