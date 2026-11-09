import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('supports human chat messages without an AI label', async ({
  page,
}) => {
  await page.goto(
    '/web/patterns-and-extensions/chat/demos/#human-support-chat'
  )
  await waitForApp(page)
  const demo = page.locator('[data-visual-test="chat-human-support"]')
  await expect(
    demo.getByText('Sara, customer support', { exact: true })
  ).toBeVisible()
  await demo.locator('textarea').fill('Can you help me with my card?')
  await demo.locator('textarea').press('Enter')
  await expect(demo.locator('.dnb-ai-message--user')).toHaveText(
    'YouCan you help me with my card?'
  )
  await expect(demo.locator('.dnb-ai-message__tag')).toHaveCount(0)
  await expect(demo.locator('textarea')).toHaveValue('')
})

test('redirects an existing AI demo link and preserves its fragment', async ({
  page,
}) => {
  await page.goto('/uilib/extensions/ai/PromptInput/demos/#custom-actions')
  await waitForApp(page)
  await expect
    .poll(() => new URL(page.url()).pathname + new URL(page.url()).hash)
    .toBe(
      '/web/patterns-and-extensions/chat/PromptInput/demos/#custom-actions'
    )
  await expect(
    page.locator('[data-visual-test="ai-prompt-input-custom"] textarea')
  ).toBeVisible()
})
