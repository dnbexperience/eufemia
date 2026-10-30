import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [1440, 390]) {
  test(`prints documentation without sidebar chrome at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/web/usage/customisation/styling/printable-apps/')
    await waitForApp(page)

    if (width === 390) {
      await page.locator('#toggle-sidebar-menu').click()
      await expect(
        page.getByRole('dialog', { name: 'Menu', exact: true })
      ).toBeVisible()
    }

    await page.emulateMedia({ media: 'print' })

    await expect(
      page.locator('.dnb-sidebar-menu-responsive-inline')
    ).toBeHidden()
    await expect(
      page.getByRole('dialog', { name: 'Menu', exact: true })
    ).toBeHidden()
    await expect(page.locator('header.sticky-menu')).toBeHidden()
    await expect(
      page.getByRole('heading', { name: 'Printable apps', exact: true })
    ).toBeVisible()
    await expect(page.locator('[data-portal-print-footer]')).toBeVisible()
  })
}
