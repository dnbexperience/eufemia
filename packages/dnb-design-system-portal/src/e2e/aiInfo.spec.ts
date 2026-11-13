import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('keeps Chat.Info and the AI overview on separate routes', async ({
  page,
}) => {
  await page.goto('/web/patterns-and-extensions/chat/Info/')
  await waitForApp(page)
  await expect(page.locator('h1')).toContainText('Chat.Info')
  const info = page.locator('.dnb-ai-info').first()
  await expect(info).toContainText('Do not share personal information')
  await expect(info.locator('a')).toHaveAttribute(
    'href',
    'https://www.dnb.no/personvern'
  )
  await expect(info).toHaveCSS('font-size', '16px')

  await page.goto('/web/patterns-and-extensions/chat/Info/info/')
  await waitForApp(page)
  await expect(page.locator('h1')).toContainText('Chat.Info')
  await page.goto('/web/patterns-and-extensions/chat/Info/demos/')
  await waitForApp(page)
  await expect(page.locator('.dnb-ai-info')).toBeVisible()
  await page.goto('/web/patterns-and-extensions/chat/Info/properties/')
  await waitForApp(page)
  await expect(page.locator('h1')).toContainText('Chat.Info')
  await expect(
    page.getByRole('cell', {
      name: 'Supporting information about the conversation. Accepts paragraphs, links, and other content.',
    })
  ).toBeVisible()

  await page.goto('/web/patterns-and-extensions/chat/about/')
  await waitForApp(page)
  await expect(page.locator('h1')).toHaveAccessibleName('Using Chat')
  await page
    .getByRole('heading', { name: 'Chat.Info', exact: true })
    .getByRole('link', { name: 'Chat.Info', exact: true })
    .click()
  await expect(page.locator('h1')).toContainText('Chat.Info')
})
