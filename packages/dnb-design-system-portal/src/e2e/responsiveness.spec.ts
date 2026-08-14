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
    const sidebar = page.locator('#portal-sidebar-menu')
    await expect(sidebar).toBeVisible()
    await page.setViewportSize({ width: 375, height: 667 }) // Set viewport size to iPhone 6 dimensions

    const menuButton = page.locator('#toggle-sidebar-menu')
    await expect(menuButton).toHaveCSS('margin-left', '8px')

    await expect(sidebar).toBeHidden()
    await menuButton.click()
    await expect(sidebar).toBeVisible()

    await expect(
      page.locator('#portal-sidebar-menu').getByText('Portal Tools')
    ).toHaveCount(0)

    await expect(sidebar).toHaveCSS('overflow-y', 'auto')

    const sidebarLink = '#portal-sidebar-menu a[href="/uilib/components"]'
    await page.click(sidebarLink)

    // Check if app is mounted
    await waitForApp(page)

    expect(page.url()).toContain('/uilib/components')
  })
})
