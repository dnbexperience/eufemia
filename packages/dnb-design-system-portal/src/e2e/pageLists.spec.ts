import { test, expect } from '@playwright/test'

const expandAllSidebarItems = async (page) => {
  const links = page.locator('.dnb-sidebar-menu__expand-button')
  const linksCount = await links.count()

  for (let i = 0; i < linksCount; i++) {
    await links.nth(i).click()
  }
}

test.describe('Page Lists', () => {
  test.describe('of components', () => {
    test.describe.configure({ retries: 3 })

    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/components')

      // Check if app is mounted
      await page
        .locator('#dnb-drawer-list__portal')
        .waitFor({ state: 'attached' })
    })

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle('Components | Eufemia')
      await expect(page.locator('h1')).toHaveText('#Components')
      await expect(page.locator('h1')).toHaveCount(1)
    })

    test('should have same amount of components', async ({ page }) => {
      await expandAllSidebarItems(page)

      const listLength = await page
        .locator(
          // make exception with:
          // - "infinity-scroller"
          '#portal-sidebar-menu ul li:has(> .dnb-sidebar-menu__item > a[href*="/uilib/components"]) ul li:is(.l-3:has(> .dnb-sidebar-menu__item > a[href*="/components"]):has(>.dnb-sidebar-menu__item> a:not([href*="/fragments"])), .l-4:has(a[href*="/infinity"]))',
        )
        .count()

      await expect(
        page.locator(
          '#tab-bar-content h2:has(a[href*="/uilib/components/"]:not([aria-hidden]))',
        ),
      ).toHaveCount(listLength)
    })
  })

  test.describe('of extensions', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/extensions')

      // Check if app is mounted
      await page
        .locator('#dnb-drawer-list__portal')
        .waitFor({ state: 'attached' })
    })

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle('Extensions | Eufemia')
      await expect(page.locator('h1')).toHaveText('#Extensions')
      await expect(page.locator('h1')).toHaveCount(1)
    })

    test('should have same amount of extensions', async ({ page }) => {
      const listLength = await page
        .locator(
          '#portal-sidebar-menu ul li:has(> .dnb-sidebar-menu__item> a[href*="/uilib/extensions"]) ul li.l-3:has(> .dnb-sidebar-menu__item> a[href*="/uilib/extensions/"])',
        )
        .count()

      await expect(
        page.locator(
          '#tab-bar-content h2:has(a[href*="/uilib/extensions/"]:not([aria-hidden]))',
        ),
      ).toHaveCount(listLength)
    })
  })

  test.describe('of elements', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/elements')

      // Check if app is mounted
      await page
        .locator('#dnb-drawer-list__portal')
        .waitFor({ state: 'attached' })
    })

    test('should have correct title', async ({ page }) => {
      await expect(page).toHaveTitle('HTML Elements | Eufemia')
      await expect(page.locator('h1')).toHaveText('#HTML Elements')
      await expect(page.locator('h1')).toHaveCount(1)
    })

    test('should have same amount of elements', async ({ page }) => {
      const listLength = await page
        .locator(
          '#portal-sidebar-menu ul li.l-2:has(> .dnb-sidebar-menu__item> a[href*="/uilib/elements"]) ul li:has(> .dnb-sidebar-menu__item> a[href*="/uilib/elements"])',
        )
        .count()
      await expect(
        page.locator(
          '#tab-bar-content ul li:has(a[href*="/uilib/elements/"]:not([aria-hidden]))',
        ),
      ).toHaveCount(listLength)
    })
  })
})
