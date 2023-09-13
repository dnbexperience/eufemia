import { Page } from '@playwright/test'

export default async function isDev(page: Page) {
  return (await page.locator('script[src="/framework.js"]').count()) > 0
}
