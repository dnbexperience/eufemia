import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Page Heading', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/')

    // Check if app is mounted
    await waitForApp(page)
  })

  test('should have correct heading element', async ({ page }) => {
    const h1Count = await page.$$eval('h1', (elements) => elements.length)
    expect(h1Count).toBe(1)

    const firstHeadingElementTagName = await page.$eval(
      '#content-grid-header > *',
      (element) => element.tagName
    )
    expect(firstHeadingElementTagName).toBe('H1')

    const firstContentElementTagName = await page.$eval(
      '#tab-bar-content > *',
      (element) => element.tagName
    )
    expect(firstContentElementTagName).toBe('P')

    const secondElementTagName = await page.$eval(
      '#tab-bar-content > p ~ *',
      (element) => element.tagName
    )
    expect(secondElementTagName).toBe('H2')

    // App should re-render
    await page.click(
      '#portal-sidebar-menu ul li a[href="/uilib/components/button"]'
    )

    // On tab pages, h1 is in .dnb-tab-bar (AutoLinkHeader), not inside #tab-bar-content
    await page.waitForSelector('.dnb-tab-bar h1')

    const reRenderedH1Count = await page.$$eval(
      'h1',
      (elements) => elements.length
    )
    expect(reRenderedH1Count).toBe(1)

    const reRenderedElementTagName = await page.$eval(
      '#tab-bar-content > h2',
      (element) => element.tagName
    )
    expect(reRenderedElementTagName).toBe('H2')
  })
})
