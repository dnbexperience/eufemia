import { test, expect } from '@playwright/test'
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

  test('click on an in-page link should scroll the page to its destination', async ({
    page,
  }) => {
    const anchor = page.locator('main a[href="#spacing-support"]').first()
    await expect(anchor).toBeVisible()
    await anchor.click()

    await expect
      .poll(() =>
        page
          .locator('#spacing-support')
          .evaluate((element) => element.getBoundingClientRect().top)
      )
      .toBeLessThan(300)
  })

  test('should scroll to linked hash element', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })

    expect(
      await page.evaluate(() => window.scrollY)
    ).toBeGreaterThanOrEqual(0)

    const anchor = page.locator('main a[href="#spacing-support"]').first()
    await expect(anchor).toBeVisible()
    await anchor.click()

    expect(page.url()).toContain('#')

    await expect
      .poll(() =>
        page
          .locator('#spacing-support')
          .evaluate((element) => element.getBoundingClientRect().top)
      )
      .toBeLessThan(300)
  })

  test('should scroll to hash element after route change', async ({
    page,
  }) => {
    await page.goto(
      '/contribute/first-contribution#how-to-report-an-issue-or-suggest-a-new-feature'
    )

    await expect(page).toHaveURL(
      /\/contribute\/first-contribution\/?#how-to-report-an-issue-or-suggest-a-new-feature$/
    )

    const target = page.locator(
      '#how-to-report-an-issue-or-suggest-a-new-feature'
    )
    await expect(target).toBeAttached()

    await expect
      .poll(async () => {
        return target.evaluate((element) => {
          return element.getBoundingClientRect().top
        })
      })
      .toBeLessThan(300)
  })
})
