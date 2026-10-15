import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('keeps Ai.Info and the AI overview on separate routes', async ({
  page,
}) => {
  await page.goto('/uilib/extensions/ai/Info/')
  await waitForApp(page)
  await expect(page.locator('h1')).toContainText('Ai.Info')
  const info = page.locator('.dnb-ai-info').first()
  await expect(info).toContainText('Do not share personal information')
  await expect(info.locator('a')).toHaveAttribute(
    'href',
    'https://www.dnb.no/personvern'
  )
  await expect(info).toHaveCSS('font-size', '16px')

  await page.goto('/uilib/extensions/ai/Info/info/')
  await waitForApp(page)
  await expect(page.locator('h1')).toContainText('Ai.Info')
  await page.goto('/uilib/extensions/ai/Info/demos/')
  await waitForApp(page)
  await expect(page.locator('.dnb-ai-info')).toBeVisible()
  await page.goto('/uilib/extensions/ai/Info/properties/')
  await waitForApp(page)
  await expect(page.locator('h1')).toContainText('Ai.Info')
  await expect(
    page.getByRole('cell', {
      name: 'Supporting information about the conversation. Accepts paragraphs, links, and other content.',
    })
  ).toBeVisible()

  await page.goto('/uilib/extensions/ai/about/')
  await waitForApp(page)
  await expect(page.locator('h1')).toContainText('AI components')
  await page.getByRole('link', { name: 'Ai.Info', exact: true }).click()
  await expect(page.locator('h1')).toContainText('Ai.Info')
})
