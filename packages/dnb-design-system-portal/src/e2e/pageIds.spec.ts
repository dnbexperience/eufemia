import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

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
