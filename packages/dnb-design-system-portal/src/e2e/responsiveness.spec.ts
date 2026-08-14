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

    const menuButton = page.locator('#toggle-sidebar-menu')
    await expect(menuButton).toHaveCSS('margin-left', '8px')

    await expect(page.locator('nav#portal-sidebar-menu')).toHaveCSS(
      'display',
      'none'
    )
    await menuButton.click()

    const sidebar = page.locator('nav#portal-sidebar-menu')
    await expect(sidebar).toHaveCSS('overflow-y', 'auto')

    const scrollPosition = await sidebar.evaluate((element) => {
      element.scrollTop = element.scrollHeight
      return element.scrollTop
    })
    expect(scrollPosition).toBeGreaterThan(0)

    const sidebarLink =
      'nav#portal-sidebar-menu a[href="/uilib/components"]'
    await page.click(sidebarLink)

    // Check if app is mounted
    await waitForApp(page)

    expect(page.url()).toContain('/uilib/components')
  })
})
