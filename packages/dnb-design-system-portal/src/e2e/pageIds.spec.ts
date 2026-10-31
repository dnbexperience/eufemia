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
    await page.goto('/web/components/')
    await expectNoDuplicateIds(page)
  })

  test('should have no duplicate ids after client side navigation', async ({
    page,
  }) => {
    await page.goto('/web/components/')

    // Check if app is mounted
    await waitForApp(page)

    await page
      .locator('#dnb-app-content')
      .getByRole('link', { name: 'Button', exact: true })
      .click()
    await expect(page).toHaveURL((url) =>
      url.pathname.startsWith('/web/components/button')
    )
    await expect(
      page
        .locator('.dnb-tab-bar')
        .getByRole('heading', { name: 'Button', exact: true })
    ).toBeVisible()

    expect(await getDuplicateIds(page)).toEqual([])
  })
})
