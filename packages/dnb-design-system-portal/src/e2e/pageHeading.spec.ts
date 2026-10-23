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

    // Without tabs, the h1 comes from the frontmatter title and sits in the header
    await expect(page.locator('.dnb-tab-bar')).toHaveCount(0)

    const h1IsBeforeContentWithoutTabs = await page.$eval(
      '#tab-bar-content',
      (content) => {
        const h1 = document.querySelector('h1')

        return (
          h1?.compareDocumentPosition(content) ===
          Node.DOCUMENT_POSITION_FOLLOWING
        )
      }
    )
    expect(h1IsBeforeContentWithoutTabs).toBe(true)

    const h1InsideContent = await page.$$eval(
      '#tab-bar-content h1',
      (elements) => elements.length
    )
    expect(h1InsideContent).toBe(0)

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

    // On tab pages, the h1 is in the tab bar, still before the content
    await page.waitForSelector('.dnb-tab-bar h1')

    const reRenderedH1Count = await page.$$eval(
      'h1',
      (elements) => elements.length
    )
    expect(reRenderedH1Count).toBe(1)

    const h1IsBeforeContentWithTabs = await page.$eval(
      '#tab-bar-content',
      (content) => {
        const h1 = document.querySelector('h1')

        return (
          h1?.compareDocumentPosition(content) ===
          Node.DOCUMENT_POSITION_FOLLOWING
        )
      }
    )
    expect(h1IsBeforeContentWithTabs).toBe(true)

    const reRenderedElementTagName = await page.$eval(
      '#tab-bar-content > h2',
      (element) => element.tagName
    )
    expect(reRenderedElementTagName).toBe('H2')
  })
})
