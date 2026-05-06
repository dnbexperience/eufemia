import { test, expect } from '@playwright/test'
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

    const sidebarLink =
      'nav#portal-sidebar-menu a[href="/uilib/components"]'
    await page.click(sidebarLink)

    // Check if app is mounted
    await waitForApp(page)

    expect(page.url()).toContain('/uilib/components')
  })
})
