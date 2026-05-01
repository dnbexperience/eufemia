import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Skip Link', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/')
    await waitForApp(page)
  })

  test('should be hidden by default', async ({ page }) => {
    const skipLink = page.locator('.dnb-skip-link')
    await expect(skipLink).toBeAttached()
    await expect(skipLink).not.toBeInViewport()
  })

  test('should become visible on Tab press', async ({ page }) => {
    const skipLink = page.locator('.dnb-skip-link')

    // Insert a temporary focusable element before the skip-link to set the
    // sequential focus navigation starting point at the very beginning of
    // the DOM. In Firefox, blur() keeps the starting point near the
    // previously focused element, so Tab would skip the skip-link.
    await page.evaluate(() => {
      const anchor = document.createElement('span')
      anchor.setAttribute('tabindex', '-1')
      anchor.style.position = 'absolute'
      document.body.insertBefore(anchor, document.body.firstChild)
      anchor.focus()
    })
    await page.keyboard.press('Tab')
    await page.evaluate(() => {
      const el = document.body.firstElementChild as HTMLElement
      if (el?.tagName === 'SPAN' && el.tabIndex === -1) {
        el.remove()
      }
    })

    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeInViewport()
  })

  test('should move focus to main content on Enter', async ({ page }) => {
    // Insert a temporary focusable element before the skip-link to set the
    // sequential focus navigation starting point (see the Tab press test).
    await page.evaluate(() => {
      const anchor = document.createElement('span')
      anchor.setAttribute('tabindex', '-1')
      anchor.style.position = 'absolute'
      document.body.insertBefore(anchor, document.body.firstChild)
      anchor.focus()
    })
    await page.keyboard.press('Tab')
    await page.evaluate(() => {
      const el = document.body.firstElementChild as HTMLElement
      if (el?.tagName === 'SPAN' && el.tabIndex === -1) {
        el.remove()
      }
    })
    await page.keyboard.press('Enter')

    const mainContent = page.locator('#dnb-app-content')
    await expect(mainContent).toBeFocused()
  })

  test('should have correct link text', async ({ page }) => {
    const skipLink = page.locator('.dnb-skip-link')
    await expect(skipLink).toHaveText('Skip to content')
  })
})
