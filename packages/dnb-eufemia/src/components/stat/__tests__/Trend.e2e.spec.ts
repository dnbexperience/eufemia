import { test, expect } from '@playwright/test'

test('exposes the formatted trend percentage once before and after an update', async ({
  page,
}) => {
  await page.goto('/uilib/components/stat/demos/#percent-within-a-trend')

  const example = page.locator(
    '[data-visual-test="stat-percent-within-trend"]'
  )
  const trend = example.locator('.dnb-stat__trend')

  await expect(trend.locator('.dnb-stat__amount')).toHaveText('1,55')
  await expect(trend).toMatchAriaSnapshot('- text: Change −1,55 prosent')

  await example.getByRole('button', { name: 'Update change' }).click()

  await expect(trend.locator('.dnb-stat__amount')).toHaveText('1,84')
  await expect(trend).toMatchAriaSnapshot('- text: Change +1,84 prosent')
})

test('preserves the currency trend label and unit', async ({ page }) => {
  await page.goto('/uilib/components/stat/demos/#currency-within-a-trend')

  const currencyTrend = page.locator(
    '[data-visual-test="stat-currency-within-trend"] .dnb-stat__trend'
  )
  await expect(currencyTrend).toMatchAriaSnapshot(
    '- text: /Revenue delta \\+46\\s?692 kroner/'
  )
})
