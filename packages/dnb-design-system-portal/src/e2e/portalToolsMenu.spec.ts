import { test, expect, type Page } from '@playwright/test'
import waitForApp from './shared/waitForApp'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

test.describe('Portal tools menu', () => {
  async function gotoAndWait(page: Page) {
    await page.goto('/uilib/components/button/demos/')
    await waitForApp(page)
  }

  test('should keep the drawer open during a page refresh', async ({
    page,
  }) => {
    await gotoAndWait(page)

    const triggerButton = page.locator(
      'button[id*="portal-tools"], [id="portal-tools"] button'
    )

    await triggerButton.first().click()

    const drawerContent = page.locator('.dnb-drawer__content')
    await expect(drawerContent).toBeVisible()

    await page.reload()
    await waitForApp(page)

    await expect(drawerContent).toBeVisible()
    await expect(
      page.evaluate(() => {
        return window.sessionStorage.getItem('portal-tools-open')
      })
    ).resolves.toBe('true')
  })
})
