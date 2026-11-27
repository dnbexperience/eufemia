import { expect, test } from '@playwright/test'

test.use({ timezoneId: 'America/New_York' })

test('keeps the calendar day in a custom date format west of UTC', async ({
  page,
}) => {
  await page.goto('/web/forms/Value/Date/demos/', {
    waitUntil: 'domcontentloaded',
  })
  const example = page.locator('.dnb-forms-value-block').filter({
    hasText: 'Payment date',
  })
  await expect(
    example.locator('.dnb-forms-value-block__content')
  ).toHaveText('29/02/2028', { timeout: 20000 })
})
