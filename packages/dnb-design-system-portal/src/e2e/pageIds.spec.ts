import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

/**
 * Runtime counterpart to vite/__tests__/page-ids.test.ts.
 *
 * The static test lints the MDX sources of every page, while this one checks
 * the rendered document, where ids also come from the portal chrome (sidebar,
 * tab bar, footer) and from Eufemia components.
 */

const getDuplicateIds = (page) =>
  page.evaluate(() => {
    const counts = new Map<string, number>()

    document.querySelectorAll('[id]').forEach((element) => {
      const { id } = element
      if (id) {
        counts.set(id, (counts.get(id) || 0) + 1)
      }
    })

    return Array.from(counts.entries())
      .filter(([, count]) => count > 1)
      .map(([id, count]) => `${id} (${count}×)`)
  })

test.describe('Page ids', () => {
  const paths = [
    '/',
    '/uilib/components/',
    '/uilib/components/button',
    '/uilib/extensions/forms',

    // Pages the static test reports as having duplicate ids, kept here so both
    // layers cover the same collisions. Each one exercises a different cause:
    // a heading repeated inside one file, a heading repeated across two
    // partials of the same page, and a heading repeating the tab title.
    '/uilib/helpers/functions',
    '/uilib/layout/flex/item',
    '/uilib/extensions/forms/Form/Section',
    '/uilib/components/avatar',
  ]

  for (const path of paths) {
    test(`should have no duplicate ids on ${path}`, async ({ page }) => {
      await page.goto(path)

      // Check if app is mounted
      await waitForApp(page)

      expect(await getDuplicateIds(page)).toEqual([])
    })
  }

  test('should have no duplicate ids after client side navigation', async ({
    page,
  }) => {
    await page.goto('/uilib/components/')

    // Check if app is mounted
    await waitForApp(page)

    // App should re-render
    await page.click(
      '#portal-sidebar-menu ul li a[href="/uilib/components/button"]'
    )
    await page.waitForSelector('.dnb-tab-bar h1')

    expect(await getDuplicateIds(page)).toEqual([])
  })
})
