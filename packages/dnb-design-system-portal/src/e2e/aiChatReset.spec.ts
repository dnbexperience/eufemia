import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.beforeEach(async ({ page }) => {
  await page.goto('/uilib/extensions/ai/demos/')
  await waitForApp(page)
})

test('starts a fresh empty chat from the welcome screen', async ({
  page,
}) => {
  const demo = page.locator('[data-visual-test="ai-chat"]')
  const prompt = demo.locator('textarea')
  const newChat = demo.getByRole('button', {
    name: 'New chat',
    exact: true,
  })

  await expect(demo.getByRole('group', { name: 'Language' })).toHaveCount(
    0
  )
  await expect(prompt).toHaveAttribute(
    'aria-placeholder',
    'Write a message'
  )
  await expect(newChat).toBeEnabled()
  await prompt.fill('Unsent draft')
  await newChat.click()

  await expect(prompt).toHaveValue('')
  await expect(prompt).toBeFocused()
  await expect(demo.locator('.dnb-ai-welcome')).toHaveCount(0)
  await expect(demo.getByRole('log')).toBeVisible()
  await expect(demo.locator('.dnb-ai-message')).toHaveCount(0)
  await expect(newChat).toBeEnabled()

  await newChat.click()
  await expect(prompt).toHaveValue('')
  await expect(prompt).toBeFocused()
  await expect(demo.locator('.dnb-ai-message')).toHaveCount(0)
})

test('discards the previous chat and its pending reply', async ({
  page,
}) => {
  const demo = page.locator('[data-visual-test="ai-chat"]')
  const prompt = demo.locator('textarea')
  await demo.getByRole('button', { name: /Block my Visa card/ }).click()
  await expect(demo.locator('.dnb-ai-task--running')).toHaveCount(1)

  await prompt.fill('Another unsent draft')
  await demo.getByRole('button', { name: 'New chat', exact: true }).click()
  await expect(prompt).toHaveValue('')
  await expect(prompt).toBeFocused()
  await expect(demo.locator('.dnb-ai-message')).toHaveCount(0)
  await expect(demo.locator('.dnb-ai-prompt-input__stop')).toHaveCount(0)

  await prompt.fill('What can you do?')
  await demo.locator('button[type="submit"]').click()
  await expect(demo.locator('.dnb-ai-response')).toContainText(
    'digital banking assistant',
    { timeout: 15000 }
  )
  await expect(demo.locator('.dnb-ai-prompt-input__stop')).toHaveCount(0)
  await expect(demo.locator('.dnb-ai-message')).toHaveCount(2)
  await expect(demo.locator('.dnb-ai-task')).toHaveCount(0)
  await expect(demo).not.toContainText('Block my Visa card')

  await demo
    .getByRole('button', { name: 'Good answer', exact: true })
    .click()
  await demo.getByRole('button', { name: 'New chat', exact: true }).click()
  await expect(prompt).toHaveValue('')
  await expect(prompt).toBeFocused()
  await expect(demo.locator('.dnb-ai-message')).toHaveCount(0)
})
