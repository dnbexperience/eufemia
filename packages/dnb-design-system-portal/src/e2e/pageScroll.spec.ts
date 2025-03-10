import { test, expect } from '@playwright/test'

test.describe('Page Scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contribute/getting-started/')

    // Ensure we do NOT set `scroll-behavior: smooth;`
    await page.$eval('html', (element) => {
      element.setAttribute('data-visual-test', 'true')
    })

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('click on a table of content anchor should scroll the page to element', async ({
    page,
  }) => {
    const anchorElement = (
      await page.locator('main .dnb-ul li a').all()
    ).at(7)
    await anchorElement?.click()

    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeGreaterThanOrEqual(2000)
  })

  test('should scroll to linked hash element', async ({ page }) => {
    expect(
      await page.evaluate(() => window.scrollY),
    ).toBeGreaterThanOrEqual(0)

    const anchorElement = (
      await page.locator('main .dnb-ul li a').all()
    ).at(7)
    await anchorElement?.click()

    expect(page.url()).toContain(
      '/contribute/getting-started/#style-dependencies',
    )

    expect(
      await page.evaluate(() => window.scrollY),
    ).toBeGreaterThanOrEqual(2000)
  })
})
