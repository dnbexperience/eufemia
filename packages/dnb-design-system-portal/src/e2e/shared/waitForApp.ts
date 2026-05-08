import type { Page } from '@playwright/test'

/**
 * Waits for the portal to finish its initial client-side mount work.
 */
export default async function waitForApp(page: Page) {
  await page.waitForSelector('#root', { state: 'attached' })
  await page.waitForFunction(() => {
    return document.documentElement.hasAttribute('data-portal-ready')
  })
}
