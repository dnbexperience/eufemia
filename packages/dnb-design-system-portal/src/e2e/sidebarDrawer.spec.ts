import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.use({ browserName: 'chromium' })

test.describe('Sidebar with Android drawers', () => {
  test.use({
    userAgent:
      'Mozilla/5.0 (Linux; Android 16; Pixel 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Mobile Safari/537.36',
    viewport: { width: 1280, height: 900 },
    hasTouch: true,
  })

  for (const { name, selector, closeSelector } of [
    {
      name: 'Portal Tools',
      selector: 'button#portal-tools',
      closeSelector: '.dnb-modal__close-button',
    },
    {
      name: 'a demo drawer',
      selector: '[data-visual-test="callback-drawer"] .dnb-modal__trigger',
      closeSelector: '.dnb-drawer__content button',
    },
  ]) {
    test(`should keep the sidebar in place when opening ${name} on a scrolled page`, async ({
      page,
    }) => {
      await page.goto(
        '/uilib/components/drawer/demos/#close-drawer-by-callback-method'
      )
      await waitForApp(page)

      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto'
        document
          .querySelector('[data-visual-test="callback-drawer"]')
          .scrollIntoView({ block: 'center', behavior: 'instant' })
      })

      const trigger = page.locator(selector).first()

      const sidebar = page.locator('#portal-sidebar-menu')
      const initialBounds = await sidebar.boundingBox()
      const scrollY = await page.evaluate(() => window.scrollY)
      expect(scrollY).toBeGreaterThan(500)
      expect(initialBounds.y).toBeGreaterThanOrEqual(0)

      await trigger.click()
      await expect(page.locator('.dnb-drawer__content')).toBeVisible()
      await expect(page.locator('body')).toHaveCSS('position', 'fixed')
      await expect
        .poll(async () => sidebar.boundingBox())
        .toEqual(initialBounds)

      await page.locator(closeSelector).click()
      await expect(page.locator('.dnb-drawer__content')).toBeHidden()
      await expect
        .poll(async () => page.evaluate(() => window.scrollY))
        .toBe(scrollY)
      expect(await sidebar.boundingBox()).toEqual(initialBounds)
    })
  }
})
