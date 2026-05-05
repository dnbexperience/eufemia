import type { Page } from '@playwright/test'
import isVite from './isVite'

/**
 * Waits for the app root element to be attached.
 * The prerendered portal build uses `#root`.
 */
export default async function waitForApp(page: Page) {
  const selector = (await isVite(page)) ? '#root' : '#eufemia-portal-root'
  await page.waitForSelector(selector, { state: 'attached' })
}
