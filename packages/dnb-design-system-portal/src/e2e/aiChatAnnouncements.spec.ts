import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('keeps streaming out of live regions and announces the final reply', async ({
  page,
}) => {
  await page.goto('/uilib/extensions/ai/demos/')
  await waitForApp(page)
  const demo = page.locator('[data-visual-test="ai-chat-announcements"]')
  const log = demo.getByRole('log')
  const announcement = demo.locator('section.dnb-aria-live')
  await expect(log).toHaveAttribute('aria-live', 'off')
  await expect(announcement).toHaveAttribute('aria-live', 'polite')
  await expect(announcement).toBeEmpty()
  await demo.locator('textarea').fill('What can you do?')
  await demo.locator('button[type="submit"]').click()
  await expect(log.locator('.dnb-ai-response')).not.toBeEmpty()
  await expect(demo.locator('.dnb-ai-prompt-input__stop')).toBeVisible()
  await expect(announcement).toBeEmpty()
  await expect(announcement).toContainText('digital banking assistant', {
    timeout: 15000,
  })
  await expect(demo.locator('.dnb-ai-prompt-input__stop')).toHaveCount(0)
  await demo.locator('textarea').fill('What can you do?')
  await demo.locator('button[type="submit"]').click()
  await expect(announcement).toBeEmpty()
  await expect(log.locator('.dnb-ai-response').nth(1)).not.toBeEmpty()
  await demo.locator('.dnb-ai-prompt-input__stop').click()
  await expect(demo.locator('.dnb-ai-prompt-input__stop')).toHaveCount(0)
  await expect(announcement).toContainText('Reply stopped.')
})
