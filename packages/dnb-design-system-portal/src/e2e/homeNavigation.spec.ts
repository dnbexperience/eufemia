import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

if (process.env.PLAYWRIGHT_BASE_URL) {
  test.use({ baseURL: process.env.PLAYWRIGHT_BASE_URL })
}

for (const width of [1440, 390]) {
  test(
    'keeps Home first and navigates to the root at ' + width + 'px',
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/web/components/button')
      await waitForApp(page)
      if (width < 960) {
        await page.locator('#toggle-sidebar-menu').click()
      }
      const menu = page.getByRole('navigation', {
        name: 'Section Content Menu',
      })
      const home = menu.getByRole('link', { name: 'Home', exact: true })
      await expect(menu.locator(':scope > ul > li').first()).toContainText(
        'Home'
      )
      await expect(home).toHaveAttribute('href', '/')
      await expect(home.locator('svg')).toBeVisible()
      await home.click()
      await expect(page).toHaveURL('/')
      await expect(
        page.getByRole('heading', {
          name: 'Welcome to Eufemia',
          exact: true,
        })
      ).toBeVisible()
      if (width < 960) {
        await expect(
          page.locator('.dnb-sidebar-menu-responsive-drawer')
        ).toHaveCount(0)
        await page.locator('#toggle-sidebar-menu').click()
      }
      await expect(home).toHaveAttribute('aria-current', 'page')
      await page.reload()
      await waitForApp(page)
      if (width < 960) {
        await page.locator('#toggle-sidebar-menu').click()
      }
      await expect(home).toHaveAttribute('aria-current', 'page')
    }
  )
}
