import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Route Focus', () => {
  test('should keep the next tab stop near the linked section on direct hash load', async ({
    page,
  }) => {
    await page.goto('/uilib/components/accordion#relevant-links')
    await waitForApp(page)

    const figmaLink = page
      .getByRole('tabpanel', { name: 'Info' })
      .getByRole('link', { name: 'Figma', exact: true })
    const skipLink = page.locator('.dnb-skip-link')

    await page.keyboard.press('Tab')

    await expect(figmaLink).toBeFocused()
    await expect(skipLink).not.toBeFocused()
  })

  test('should focus content when no hash is given', async ({ page }) => {
    await page.goto('/uilib/components/accordion')
    await waitForApp(page)

    const skipLink = page.locator('.dnb-skip-link')

    await page.keyboard.press('Tab')

    await expect(skipLink).toBeFocused()
  })

  test('should focus content when navigating to a route without hash', async ({
    page,
  }) => {
    await page.goto('/uilib/components/')
    await waitForApp(page)

    await page
      .locator('a[href="/uilib/components/accordion"]')
      .first()
      .click()

    await expect(page).toHaveURL('/uilib/components/accordion')

    const pageHeading = page.locator('.dnb-app-content h1').first()
    const tabList = page.locator('.dnb-tabs__tabs__tablist')

    await expect(pageHeading).toBeFocused()

    await page.keyboard.press('Tab')

    await expect
      .poll(() =>
        tabList.evaluate((element) =>
          element.contains(document.activeElement)
        )
      )
      .toBe(true)
  })

  test('should remove the current hash and focus content when navigating to another tab', async ({
    page,
  }) => {
    await page.goto('/uilib/components/accordion#relevant-links')
    await waitForApp(page)

    await page.getByRole('tab', { name: 'Demos' }).click()

    await expect(page).toHaveURL('/uilib/components/accordion/demos')

    const pageHeading = page.locator('.dnb-app-content h1').first()

    await expect(pageHeading).toBeFocused()
  })

  test('should load the demos tab route directly', async ({ page }) => {
    await page.goto('/uilib/components/accordion/demos')
    await waitForApp(page)

    await expect(page).toHaveURL('/uilib/components/accordion/demos/')
    await expect(page.getByRole('tab', { name: 'Demos' })).toBeVisible()
  })

  test('should preserve the current hash when entering fullscreen', async ({
    page,
  }) => {
    await page.goto('/uilib/components/accordion#relevant-links')
    await waitForApp(page)

    await page.getByRole('link', { name: 'Fullscreen' }).click()

    await expect(page).toHaveURL(
      '/uilib/components/accordion/?fullscreen#relevant-links'
    )
  })
})
