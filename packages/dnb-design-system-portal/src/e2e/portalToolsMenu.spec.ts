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
    await page.goto('/web/components/button/demos/')
    await waitForApp(page)
  }

  for (const width of [390, 1280]) {
    test(
      'previews native typography across navigation and refresh at ' +
        width +
        'px',
      async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 })
        await gotoAndWait(page)
        await page
          .getByRole('button', { name: 'Portal Tools', exact: true })
          .click()
        const drawer = page.getByRole('dialog', { name: 'Portal Tools' })
        const toggle = drawer.getByRole('switch', {
          name: 'Native app font size',
          exact: true,
        })
        const skeleton = drawer.getByRole('switch', {
          name: 'Show everything behind skeletons',
        })
        const grid = drawer.getByRole('switch', { name: 'Show grid' })

        await expect(toggle).not.toBeChecked()
        await toggle.check()
        await expect(drawer.locator('.dnb-drawer__title')).toBeVisible()
        await expect
          .poll(() =>
            page.evaluate(
              () =>
                JSON.parse(localStorage.getItem('eufemia-theme') || '{}')
                  .typography
            )
          )
          .toBe('native')
        await expect(
          drawer
            .locator('label')
            .filter({ hasText: 'Native app font size' })
        ).toHaveCSS('font-size', '17px')

        await skeleton.check()
        await expect(grid).toBeEnabled()
        await expect(toggle).toBeEnabled()
        await grid.check()
        await expect(page.locator('html')).toHaveAttribute(
          'show-dev-grid',
          'true'
        )
        await grid.uncheck()
        await skeleton.uncheck()

        await drawer
          .getByRole('radio', { name: 'Dark', exact: true })
          .click()
        await expect(toggle).toBeChecked()
        await drawer.locator('#change-theme').click()
        await page
          .locator('#change-theme-portal ul li:nth-child(2)')
          .click()
        await expect(toggle).toBeChecked()
        await expect(
          drawer
            .locator('label')
            .filter({ hasText: 'Native app font size' })
        ).toHaveCSS('font-size', '16px')

        await drawer
          .getByRole('button', { name: /Close|Lukk/ })
          .first()
          .click()
        const infoTab = page
          .getByRole('tab', { name: 'Info', exact: true })
          .first()
        await infoTab.focus()
        await infoTab.press('Enter')
        await expect(page).toHaveURL(/\/web\/components\/button\/?$/)
        await expect
          .poll(() =>
            page.locator('.eufemia-theme__typography--native').count()
          )
          .toBeGreaterThan(0)
        await page.reload()
        await waitForApp(page)
        await page
          .getByRole('button', { name: 'Portal Tools', exact: true })
          .click()
        await expect(toggle).toBeChecked()
        await toggle.uncheck()
        await expect
          .poll(() =>
            page.evaluate(
              () =>
                JSON.parse(localStorage.getItem('eufemia-theme') || '{}')
                  .typography
            )
          )
          .toBe('web')
      }
    )

    test(
      'keeps skeleton and grid switches close together at ' + width + 'px',
      async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 })
        await gotoAndWait(page)
        await page
          .getByRole('button', { name: 'Portal Tools', exact: true })
          .click()
        const drawer = page.getByRole('dialog', { name: 'Portal Tools' })
        const skeleton = drawer.locator('.dnb-switch').filter({
          has: page.getByRole('switch', {
            name: 'Show everything behind skeletons',
          }),
        })
        const grid = drawer
          .locator('.dnb-switch')
          .filter({ has: page.getByRole('switch', { name: 'Show grid' }) })
        const skeletonBox = await skeleton.boundingBox()
        const gridBox = await grid.boundingBox()
        expect(
          gridBox.y - skeletonBox.y - skeletonBox.height
        ).toBeLessThanOrEqual(16)
      }
    )
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
