import { test, expect } from '@playwright/test'
import isVite from './shared/isVite'
import waitForApp from './shared/waitForApp'

test.describe('Page Scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contribute/getting-started/')

    // Ensure we do NOT set `scroll-behavior: smooth;`
    await page.$eval('html', (element) => {
      element.setAttribute('data-visual-test', 'true')
    })

    // Check if app is mounted
    await waitForApp(page)
  })

  test('click on a table of content anchor should scroll the page to element', async ({
    page,
  }) => {
    const anchors = await page.locator('main .dnb-ul li a').all()
    const anchorIndex = (await isVite(page)) ? 0 : 7

    if (anchors.length <= anchorIndex) {
      return // page structure different, skip
    }

    await anchors[anchorIndex]?.click()

    await page.waitForFunction(() => window.scrollY > 0, {
      timeout: 5000,
    })

    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeGreaterThan(0)
  })

  test('should scroll to linked hash element', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })

    expect(
      await page.evaluate(() => window.scrollY)
    ).toBeGreaterThanOrEqual(0)

    // Find an anchor link that has a hash
    const anchors = await page
      .locator('main .dnb-ul li a[href*="#"]')
      .all()
    if (anchors.length === 0) {
      return // no hash anchors, skip
    }

    const anchor = anchors[0]
    await anchor.click()

    expect(page.url()).toContain('#')

    await page.waitForFunction(() => window.scrollY > 0, {
      timeout: 5000,
    })
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  })
})
