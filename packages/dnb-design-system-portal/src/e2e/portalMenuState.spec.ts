import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Portal section menu state', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/uilib/components/')
    await waitForApp(page)
  })

  test('shows the destination after search navigation from the open menu', async ({
    page,
    browserName,
  }) => {
    // Keep the test independent of the live search index.
    await page.route('**/1/indexes/**', (route) =>
      route.fulfill({
        json: {
          hits: [
            { slug: 'uilib/components/accordion', title: 'Accordion' },
          ],
        },
      })
    )

    const toggle = page.locator('#toggle-sidebar-menu')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('.dnb-app-content')).toBeHidden()
    await expect(
      page.locator('#portal-sidebar-menu li.is-active a').first()
    ).toBeFocused()
    await page.locator('#portal-search').fill('Accordion')
    await page
      .getByRole('listbox')
      .locator('a[href="/uilib/components/accordion"]')
      .click()

    await expect(page).toHaveURL('/uilib/components/accordion')
    await expect(page.locator('.dnb-app-content')).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByRole('listbox')).toHaveCount(0)
    await expect(page.locator('.dnb-app-content h1').first()).toBeFocused()
    await page.keyboard.press('Tab')
    if (browserName === 'webkit') {
      // WebKit's default Tab order skips ordinary links.
      await expect(page.getByRole('tablist').first()).toBeFocused()
    } else {
      await expect(
        page.getByRole('link', { name: 'Link to Accordion', exact: true })
      ).toBeFocused()
    }
  })

  test('shows content after leaving narrow mode and keeps the menu closed on return', async ({
    page,
  }) => {
    const toggle = page.locator('#toggle-sidebar-menu')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('.dnb-app-content')).toBeHidden()

    const focusedLink = page
      .locator('#portal-sidebar-menu li.is-active a')
      .first()
    await expect(focusedLink).toBeFocused()
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(toggle).toBeHidden()
    await expect(page.locator('.dnb-app-content')).toBeVisible()
    await expect(page.locator('#portal-sidebar-menu')).toBeVisible()
    await expect(focusedLink).toBeFocused()
    await expect(focusedLink).toBeInViewport()

    await page.setViewportSize({ width: 375, height: 667 })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('.dnb-app-content')).toBeVisible()
    await expect(page.locator('#portal-sidebar-menu')).toBeHidden()
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(page.locator('.dnb-app-content')).toBeVisible()
  })

  test('keeps normal close behavior, focus, and page scroll', async ({
    page,
  }) => {
    await page.evaluate(() =>
      window.scrollTo({ top: 480, behavior: 'instant' })
    )
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(480)
    const toggle = page.locator('#toggle-sidebar-menu')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await toggle.click()

    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('.dnb-app-content')).toBeVisible()
    await expect(page.locator('.dnb-app-content h1').first()).toBeFocused()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(480)
  })

  test('keeps direct sidebar navigation working', async ({ page }) => {
    const toggle = page.locator('#toggle-sidebar-menu')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page
      .locator(
        '#portal-sidebar-menu a[href="/uilib/components/accordion"]'
      )
      .click()

    await expect(page).toHaveURL('/uilib/components/accordion')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('.dnb-app-content')).toBeVisible()
    await expect(page.locator('.dnb-app-content h1').first()).toBeFocused()
  })
})
