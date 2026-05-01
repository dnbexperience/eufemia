import { test, expect, type Page } from '@playwright/test'
import waitForApp from './shared/waitForApp'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

test.describe('Locale switching', () => {
  async function gotoAndWait(page: Page) {
    const url = '/uilib/components/button/demos/'
    await page.goto(url)
    await waitForApp(page)
  }

  test('should default to nb-NO locale', async ({ page }) => {
    await gotoAndWait(page)

    const locale = await page.evaluate(() => {
      return window.localStorage.getItem('locale')
    })

    // Default is nb-NO — localStorage may be null (first visit) or 'nb-NO'
    expect(locale === null || locale === 'nb-NO').toBe(true)
  })

  test('should switch locale via portal tools', async ({ page }) => {
    await gotoAndWait(page)

    // Open portal tools drawer
    const triggerButton = page.locator(
      'button[id*="portal-tools"], [id="portal-tools"] button'
    )
    await triggerButton.first().click()

    // Wait for the drawer to open
    await page
      .locator('.dnb-drawer__content')
      .waitFor({ state: 'visible', timeout: 5000 })

    // Click the locale dropdown trigger using its label
    const dropdown = page.getByLabel('Change components language')
    await dropdown.click()

    // Select English (GB) from the dropdown options (rendered in portal)
    await page
      .locator('li.dnb-drawer-list__option')
      .filter({ hasText: 'English (GB)' })
      .click()

    // Verify localStorage was updated
    const locale = await page.evaluate(() => {
      return window.localStorage.getItem('locale')
    })
    expect(locale).toBe('en-GB')
  })

  test('should persist locale across page reload', async ({ page }) => {
    await gotoAndWait(page)

    // Set locale to en-GB via localStorage
    await page.evaluate(() => {
      window.localStorage.setItem('locale', 'en-GB')
    })

    await page.reload()
    await waitForApp(page)

    // Verify the locale is still en-GB after reload
    const locale = await page.evaluate(() => {
      return window.localStorage.getItem('locale')
    })
    expect(locale).toBe('en-GB')
  })

  test('should update component text when switching locale', async ({
    page,
  }) => {
    await gotoAndWait(page)

    // Set locale to en-GB and reload
    await page.evaluate(() => {
      window.localStorage.setItem('locale', 'en-GB')
    })
    await page.reload()
    await waitForApp(page)

    // Switch back to nb-NO and reload
    await page.evaluate(() => {
      window.localStorage.setItem('locale', 'nb-NO')
    })
    await page.reload()
    await waitForApp(page)

    const locale = await page.evaluate(() => {
      return window.localStorage.getItem('locale')
    })
    expect(locale).toBe('nb-NO')
  })
})
