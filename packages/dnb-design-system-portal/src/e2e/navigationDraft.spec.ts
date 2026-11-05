import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

const tokensPath = '/web/styling-and-themes/design-tokens'
const firstFormPath = '/web/forms/getting-started'

for (const width of [1440, 390]) {
  test(
    'finds shared assets and Web guidance at ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/getting-started/')
      await waitForApp(page)
      const menu = async () => {
        if (width < 960) {
          await page.locator('#toggle-sidebar-menu').click()
          const drawer = page.getByRole('dialog', {
            name: 'Menu',
            exact: true,
          })
          await expect(drawer).toBeVisible()
          return drawer
        }
        return page.locator('#portal-sidebar-menu')
      }
      let nav = await menu()
      await nav
        .getByRole('button', { name: 'Collections', exact: true })
        .click()
      await nav.getByRole('link', { name: 'Icons', exact: true }).click()
      await expect(page).toHaveURL(new RegExp('/collections/icons/?$'))
      await expect(page.locator('h1')).toContainText('Icons')
      nav = await menu()
      await nav
        .getByRole('navigation', { name: 'Platform Content Menu' })
        .getByRole('button', { name: 'Get started', exact: true })
        .click()
      await nav
        .getByRole('link', {
          name: 'Set up Eufemia Web in Figma',
          exact: true,
        })
        .click()
      await expect(page).toHaveURL(
        new RegExp('/web/get-started/design-for-web/?$')
      )
      await expect(page.locator('h1')).toContainText(
        'Set up Eufemia Web in Figma'
      )
      nav = await menu()
      await nav
        .getByRole('button', { name: 'Styling and themes', exact: true })
        .click()
      await nav
        .getByRole('link', { name: 'Design tokens', exact: true })
        .click()
      await expect(page).toHaveURL(new RegExp(tokensPath + '/?$'))
      await expect(page.locator('h1')).toContainText('Design tokens')
      nav = await menu()
      await nav.getByRole('button', { name: 'Forms', exact: true }).click()
      await nav
        .getByRole('link', { name: 'Build your first form', exact: true })
        .click()
      await expect(page).toHaveURL(new RegExp(firstFormPath + '/?$'))
      await expect(page.locator('h1')).toContainText(
        'Build your first form'
      )
    }
  )
}
