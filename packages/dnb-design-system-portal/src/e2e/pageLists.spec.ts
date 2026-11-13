import { test, expect, type Locator } from '@playwright/test'
import waitForApp from './shared/waitForApp'

const expandAllSidebarItems = async (page) => {
  await page
    .locator('.dnb-sidebar-menu__accordion__toggle[aria-expanded="false"]')
    .evaluateAll((buttons: HTMLButtonElement[]) => {
      buttons.forEach((button) => button.click())
    })

  await expect(
    page.locator('.dnb-height-animation--animating')
  ).toHaveCount(0)
}

const getHeadingTextWithoutSrDescription = async (locator: Locator) =>
  locator.evaluate((element: HTMLElement) => {
    const clone = element.cloneNode(true) as HTMLElement
    clone
      .querySelectorAll('.dnb-tooltip__sr-description, .anchor-hash')
      .forEach((node) => node.remove())
    return (clone.textContent || '').trim()
  })

test.describe('Page Lists', () => {
  test.describe('of components', () => {
    test.describe.configure({ retries: 3 })

    test.beforeEach(async ({ page }) => {
      await page.goto('/web/components/overview/')

      // Check if app is mounted
      await waitForApp(page)
    })

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle('Components by category | Eufemia')
      const headingText = await getHeadingTextWithoutSrDescription(
        page.locator('h1')
      )
      await expect(headingText).toBe('Components by category')
      await expect(page.locator('h1')).toHaveCount(1)
    })

    test('should have same amount of components', async ({ page }) => {
      await expandAllSidebarItems(page)

      await expect(
        page.locator(
          '#tab-bar-content a[href="/web/components/overview/"]'
        )
      ).toHaveCount(0)

      const menuPaths = await page
        .locator(
          '#portal-sidebar-menu [data-sidebar-menu-id="web-components"] a[href^="/web/components/"]'
        )
        .evaluateAll((links) => {
          return [
            ...new Set(
              links
                .map((link) => link.getAttribute('href'))
                .filter(
                  (href) =>
                    href &&
                    href !== '/web/components/overview/' &&
                    href !== '/web/components/icon/usage/' &&
                    href !== '/web/components/fragments/' &&
                    !href.startsWith('/web/components/fragments/')
                )
            ),
          ].sort()
        })

      const overviewPaths = await page
        .locator('#tab-bar-content a[href^="/web/components/"]')
        .evaluateAll((links) =>
          [
            ...new Set(
              links
                .map((link) => link.getAttribute('href'))
                .filter(
                  (href) =>
                    href &&
                    href !== '/web/components/overview/' &&
                    href !== '/web/components/icon/usage/' &&
                    href !== '/web/components/fragments/' &&
                    !href.startsWith('/web/components/fragments/')
                )
            ),
          ].sort()
        )
      expect(overviewPaths).toEqual(menuPaths)
    })
  })

  test.describe('of extensions', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/web/patterns-and-extensions/using-patterns-and-extensions/'
      )

      // Check if app is mounted
      await waitForApp(page)
    })

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle(
        'Using patterns and extensions | Eufemia'
      )
      const headingText = await getHeadingTextWithoutSrDescription(
        page.locator('h1')
      )
      await expect(headingText).toBe('Using patterns and extensions')
      await expect(page.locator('h1')).toHaveCount(1)
    })

    test.skip('should have same amount of extensions', async ({
      page,
    }) => {
      // Vite renders all extension sub-pages inline.

      const listLength = await page
        .locator(
          '#portal-sidebar-menu [data-sidebar-menu-id="web-patterns-and-extensions-extensions"] [data-sidebar-menu-id] > a[href^="/web/extensions/"], #portal-sidebar-menu [data-sidebar-menu-id="web-patterns-and-extensions-extensions"] [data-sidebar-menu-id] > .dnb-sidebar-menu__accordion__trigger a[href^="/web/extensions/"]'
        )
        .count()

      await expect(
        page.locator(
          '#tab-bar-content h2:has(a[href*="/web/extensions/":not([aria-hidden]))'
        )
      ).toHaveCount(listLength)
    })
  })

  test.describe('of elements', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/web/layout-and-typography/elements/')

      // Check if app is mounted
      await waitForApp(page)
    })

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle('HTML elements | Eufemia')
      const headingText = await getHeadingTextWithoutSrDescription(
        page.locator('h1')
      )
      await expect(headingText).toBe('HTML elements')
      await expect(page.locator('h1')).toHaveCount(1)
    })

    test('should have same amount of elements', async ({ page }) => {
      await expandAllSidebarItems(page)

      const sidebarLinks = page.locator(
        '#portal-sidebar-menu [data-sidebar-menu-id="web-layout-and-typography-elements"] [data-sidebar-menu-id] > a[href^="/web/elements/"]'
      )
      const pageLinks = page.locator(
        '#tab-bar-content ul li a[href^="/web/elements/"]:not([aria-hidden])'
      )

      await expect(pageLinks).toHaveCount(await sidebarLinks.count())
    })
  })
})
