import { test, expect, type Page } from '@playwright/test'
import waitForApp from './shared/waitForApp'

async function clearStorage(page: Page) {
  await page.evaluate(() => window.localStorage.clear())
  await page.evaluate(() => window.sessionStorage.clear())
}

test.afterEach(async ({ page }) => {
  await clearStorage(page)
})

test.describe('Grid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/web/components/')

    // Check if app is mounted
    await waitForApp(page)
  })

  test('click on grid switch should enable the grid', async ({ page }) => {
    await page.click('#portal-tools')
    await page.click('#switch-grid')
    await page.waitForSelector('html[show-dev-grid="true"]', {
      state: 'attached',
    })
    const elem = page.locator('html[show-dev-grid="true"]')
    await expect(elem).toBeAttached()
  })

  for (const colorScheme of ['light', 'dark'] as const) {
    test(`keeps the ${colorScheme} grid subtle and outside the sidebar`, async ({
      page,
    }) => {
      await page.evaluate((scheme) => {
        localStorage.setItem(
          'eufemia-theme',
          JSON.stringify({ colorScheme: scheme })
        )
      }, colorScheme)
      await page.reload()
      await waitForApp(page)

      const sidebar = page.locator('#portal-sidebar-menu')
      const heading = page.locator('main h1').first()
      const headingBackground = await heading.evaluate(
        (element) => getComputedStyle(element).backgroundColor
      )
      const sidebarItems = sidebar.locator('.dnb-sidebar-menu')
      const sidebarBackgrounds = await sidebarItems.evaluateAll((items) =>
        items.map((item) => getComputedStyle(item).backgroundColor)
      )

      await page.click('#portal-tools')
      await page.click('#switch-grid')
      await page.locator('.dnb-modal__close-button').click()
      await expect(page.locator('#switch-grid')).toBeHidden()

      await expect(page.locator('html')).toHaveAttribute(
        'show-dev-grid',
        'true'
      )
      await expect(sidebar.locator('.dev-grid')).toHaveCount(0)
      expect(
        await sidebarItems.evaluateAll((items) =>
          items.map((item) => getComputedStyle(item).backgroundColor)
        )
      ).toEqual(sidebarBackgrounds)
      expect(
        await heading.evaluate(
          (element) => getComputedStyle(element).backgroundColor
        )
      ).toBe(headingBackground)

      const grid = page.locator('main .dev-grid').first()
      const opacity = await grid.evaluate((element) => {
        const style = getComputedStyle(element)
        return {
          minor: Number(style.getPropertyValue('--grid-opacity')),
          major: Number(style.getPropertyValue('--grid-opacity-bold')),
          background: getComputedStyle(element, '::after').backgroundImage,
        }
      })
      expect(opacity.background).toContain('repeating-linear-gradient')
      expect(opacity.minor).toBeGreaterThan(0)
      expect(opacity.major).toBeGreaterThan(opacity.minor)
      expect(opacity.major).toBeLessThanOrEqual(0.15)

      await page.reload()
      await waitForApp(page)
      await expect(page.locator('html')).toHaveAttribute(
        'show-dev-grid',
        'true'
      )

      await page.click('#portal-tools')
      await page.click('#switch-grid')
      await expect(page.locator('html')).not.toHaveAttribute(
        'show-dev-grid'
      )
    })
  }

  test('font weight example grid is dimmed in dark mode', async ({
    page,
  }) => {
    await page.goto('/web/layout-and-typography/typography/css-reference')
    await waitForApp(page)
    await page.evaluate(() => {
      window.localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ brand: 'ui', colorScheme: 'dark' })
      )
    })
    await page.reload()
    await waitForApp(page)

    const grid = page.locator('.typography-box').first()
    const opacity = await grid.evaluate((element) => {
      const style = getComputedStyle(element)

      return {
        lines: Number(style.getPropertyValue('--grid-opacity')),
        boldLines: Number(style.getPropertyValue('--grid-opacity-bold')),
      }
    })

    expect(opacity.lines).toBeLessThanOrEqual(0.05)
    expect(opacity.boldLines).toBeLessThanOrEqual(0.1)
  })
})
