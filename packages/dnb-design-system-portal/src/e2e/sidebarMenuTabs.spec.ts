import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('SidebarMenu documentation tabs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/sidebar-menu')
    await waitForApp(page)
  })

  test('navigates to properties and events', async ({ page }) => {
    const properties = page.getByRole('tab', {
      name: 'Properties',
      exact: true,
    })
    await properties.click()

    await expect(page).toHaveURL(
      '/uilib/components/sidebar-menu/properties'
    )
    await expect(properties).toHaveAttribute('aria-selected', 'true')
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Container',
        exact: true,
      })
    ).toBeVisible()

    const events = page.getByRole('tab', {
      name: 'Events',
      exact: true,
    })
    await events.click()

    await expect(page).toHaveURL('/uilib/components/sidebar-menu/events')
    await expect(events).toHaveAttribute('aria-selected', 'true')
    await expect(
      page.getByRole('heading', {
        name: 'SidebarMenu.Container Events',
        exact: true,
      })
    ).toBeVisible()
  })
})
