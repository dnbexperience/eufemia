import type { Page } from '@playwright/test'

/**
 * Returns true if the page is served by the Vite build
 * (as opposed to Gatsby). Vite builds include theme CSS
 * with "eufemia-theme-" in the href.
 */
export default async function isVite(page: Page) {
  return (
    (await page.locator('link[data-eufemia-theme]').first().count()) > 0
  )
}
