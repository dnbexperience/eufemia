import { test, expect, type Locator } from '@playwright/test'
import waitForApp from './shared/waitForApp'

const expandAllSidebarItems = async (page) => {
  await page
    .locator('.dnb-sidebar-menu__accordion__toggle[aria-expanded="false"]')
    .evaluateAll((buttons: HTMLButtonElement[]) => {
      buttons.forEach((button) => button.click())
    })

  await page.waitForTimeout(500)
}

const getHeadingTextWithoutSrDescription = async (locator: Locator) =>
  locator.evaluate((element: HTMLElement) => {
    const clone = element.cloneNode(true) as HTMLElement
    clone
      .querySelectorAll('.dnb-tooltip__sr-description')
      .forEach((node) => node.remove())
    return (clone.textContent || '').trim()
  })

test.describe('Page Lists', () => {
  test.describe('of components', () => {
    test.describe.configure({ retries: 3 })

    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/components/')

      // Check if app is mounted
      await waitForApp(page)
    })

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle('Components | Eufemia')
      const headingText = await getHeadingTextWithoutSrDescription(
        page.locator('h1')
      )
      await expect(headingText).toBe('#Components')
      await expect(page.locator('h1')).toHaveCount(1)
    })

    test('should have same amount of components', async ({ page }) => {
      await expandAllSidebarItems(page)

      const listLength = await page
        .locator(
          '#portal-sidebar-menu [data-sidebar-menu-id="uilib-components"] a[href^="/uilib/components/"]'
        )
        .evaluateAll((links) => {
          return (
            new Set(
              links
                .map((link) => link.getAttribute('href'))
                .filter(
                  (href) =>
                    href &&
                    href !== '/uilib/components/fragments' &&
                    !href.startsWith('/uilib/components/fragments/')
                )
            ).size + 1
          ) // infinity-scroller is grouped below fragments
        })

      await expect(
        page.locator(
          '#tab-bar-content h2:has(a[href*="/uilib/components/"]:not([aria-hidden]))'
        )
      ).toHaveCount(listLength)
    })
  })

  test.describe('of extensions', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/extensions/')

      // Check if app is mounted
      await waitForApp(page)
    })

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle('Extensions | Eufemia')
      const headingText = await getHeadingTextWithoutSrDescription(
        page.locator('h1')
      )
      await expect(headingText).toBe('#Extensions')
      await expect(page.locator('h1')).toHaveCount(1)
    })

    test.skip('should have same amount of extensions', async ({
      page,
    }) => {
      // Vite renders all extension sub-pages inline.

      const listLength = await page
        .locator(
          '#portal-sidebar-menu [data-sidebar-menu-id="uilib-extensions"] [data-sidebar-menu-id] > a[href^="/uilib/extensions/"], #portal-sidebar-menu [data-sidebar-menu-id="uilib-extensions"] [data-sidebar-menu-id] > .dnb-sidebar-menu__accordion__trigger a[href^="/uilib/extensions/"]'
        )
        .count()

      await expect(
        page.locator(
          '#tab-bar-content h2:has(a[href*="/uilib/extensions/":not([aria-hidden]))'
        )
      ).toHaveCount(listLength)
    })
  })

  test.describe('of elements', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/elements/')

      // Check if app is mounted
      await waitForApp(page)
    })

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle('HTML Elements | Eufemia')
      const headingText = await getHeadingTextWithoutSrDescription(
        page.locator('h1')
      )
      await expect(headingText).toBe('#HTML Elements')
      await expect(page.locator('h1')).toHaveCount(1)
    })

    test('should have same amount of elements', async ({ page }) => {
      await expandAllSidebarItems(page)

      const listLength = await page
        .locator(
          '#portal-sidebar-menu [data-sidebar-menu-id="uilib-elements"] a[href^="/uilib/elements/"]'
        )
        .evaluateAll((links) => {
          return new Set(links.map((link) => link.getAttribute('href')))
            .size
        })
      await expect(
        page.locator(
          '#tab-bar-content ul li:has(a[href*="/uilib/elements/"]:not([aria-hidden]))'
        )
      ).toHaveCount(listLength)
    })
  })
})
