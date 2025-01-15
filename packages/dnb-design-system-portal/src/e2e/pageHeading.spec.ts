import { test, expect } from '@playwright/test'

test.describe('Page Heading', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components')

    // Check if app is mounted
    await page.waitForSelector('#dnb-drawer-list__portal', {
      state: 'attached',
    })
  })

  test('should have correct heading element', async ({ page }) => {
    const h1Count = await page.$$eval('h1', (elements) => elements.length)
    expect(h1Count).toBe(1)

    const firstElementTagName = await page.$eval(
      '#tab-bar-content > *',
      (element) => element.tagName,
    )
    expect(firstElementTagName).toBe('H1')

    const secondElementTagName = await page.$eval(
      '#tab-bar-content > h1 ~ p ~ *',
      (element) => element.tagName,
    )
    expect(secondElementTagName).toBe('H2')

    const thirdElementTagName = await page.$eval(
      '#tab-bar-content > h1 ~ p ~ *',
      (element) => element.tagName,
    )
    expect(thirdElementTagName).toBe('H2')

    // App should re-render
    await page.click(
      '#portal-sidebar-menu ul li a[href*="/uilib/components/"]:first-child',
    )

    const reRenderedElementTagName = await page.$eval(
      '#tab-bar-content > h1 ~ p ~ *',
      (element) => element.tagName,
    )
    expect(reRenderedElementTagName).toBe('H2')
  })
})
