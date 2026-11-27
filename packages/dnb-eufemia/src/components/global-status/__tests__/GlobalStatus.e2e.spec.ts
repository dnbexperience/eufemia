import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto(
    '/web/components/global-status/visual-tests/answer-summary/'
  )
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.locator('#answer-summary')).toBeFocused()
})

test('lets the user type a correction immediately after following a summary link', async ({
  page,
}) => {
  const summary = page.locator('#answer-summary')
  const title = page.getByRole('textbox', { name: 'Account title' })
  const reference = page.getByRole('textbox', { name: 'Reference' })
  const link = summary.getByRole('link', { name: /Account title/ })
  await expect(title).toHaveAttribute('aria-invalid', 'true')
  await expect(title).toHaveAccessibleDescription(
    'This field is required.'
  )
  await expect(link).toHaveAccessibleDescription('This field is required.')
  await link.press('Enter')
  await expect(title).toBeFocused()
  await page.keyboard.type('Corrected')
  await expect(title).toHaveValue('Corrected')
  await expect(reference).toHaveValue('')
  await page.keyboard.press('Tab')
  await expect(reference).toBeFocused()
})

test('focuses an enabled choice, the first editable segment, or the visible picker button', async ({
  page,
}) => {
  const summary = page.locator('#answer-summary')
  await summary.getByRole('link', { name: /Method/ }).press('Space')
  await expect(page.getByRole('radio', { name: 'Transfer' })).toBeFocused()
  await summary.getByRole('link', { name: /Expiry/ }).click()
  await expect(
    page.locator('.dnb-forms-field-expiry').getByRole('spinbutton').first()
  ).toBeFocused()
  await summary.getByRole('link', { name: /Payment date/ }).press('Enter')
  await expect(
    page.locator('.dnb-date-picker').getByRole('button')
  ).toBeFocused()
})
