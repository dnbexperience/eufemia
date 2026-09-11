import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

/**
 * Runtime counterpart to vite/__tests__/page-ids.test.ts.
 *
 * The static test lints the MDX sources of every page, while this one checks
 * the rendered document, where ids also come from the portal chrome (sidebar,
 * tab bar, footer) and from Eufemia components.
 *
 * Every route is written as a literal `page.goto()` argument, because the
 * test build only prerenders the pages it can read out of these calls
 * (see vite/client/plugins/test-page-filter.ts).
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

const expectNoDuplicateIds = async (page) => {
  // Check if app is mounted
  await waitForApp(page)

  expect(await getDuplicateIds(page)).toEqual([])
}

test.describe('Page ids', () => {
  test('should have no duplicate ids on the front page', async ({
    page,
  }) => {
    await page.goto('/')
    await expectNoDuplicateIds(page)
  })

  test('should have no duplicate ids on a category page', async ({
    page,
  }) => {
    await page.goto('/uilib/components/')
    await expectNoDuplicateIds(page)
  })

  test('should have no duplicate ids on a component page', async ({
    page,
  }) => {
    await page.goto('/uilib/components/button')
    await expectNoDuplicateIds(page)
  })

  test('should have no duplicate ids on an extension page', async ({
    page,
  }) => {
    await page.goto('/uilib/extensions/forms')
    await expectNoDuplicateIds(page)
  })

  // The pages below are reported by the static test as having duplicate ids,
  // and are kept here so both layers cover the same collisions. Each one
  // exercises a different cause.

  // A heading repeated inside one file.
  test('should have no duplicate ids on a page repeating a heading', async ({
    page,
  }) => {
    await page.goto('/uilib/helpers/functions')
    await expectNoDuplicateIds(page)
  })

  // A heading repeated across two partials of the same page.
  test('should have no duplicate ids on a page built from partials', async ({
    page,
  }) => {
    await page.goto('/uilib/layout/flex/item')
    await expectNoDuplicateIds(page)
  })

  test('should have no duplicate ids on a page with tabbed partials', async ({
    page,
  }) => {
    await page.goto('/uilib/extensions/forms/Form/Section')
    await expectNoDuplicateIds(page)
  })

  // A heading repeating the tab title.
  test('should have no duplicate ids on a page repeating its title', async ({
    page,
  }) => {
    await page.goto('/uilib/components/avatar')
    await expectNoDuplicateIds(page)
  })

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
