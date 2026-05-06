import type { Page } from '@playwright/test'

/**
 * Waits for the app root element to be attached.
 * The portal app uses `#root`.
 */
export default async function waitForApp(page: Page) {
  await page.waitForSelector('#root', { state: 'attached' })
}
