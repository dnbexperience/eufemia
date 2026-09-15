import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Connector.Bring', () => {
  test('keeps an invalid Swedish postal code error after change, blur, and submit', async ({
    page,
  }) => {
    await page.goto('/uilib/extensions/forms/Connectors/Bring/')
    await waitForApp(page)

    const form = page
      .locator('form')
      .filter({
        has: page.locator('.dnb-forms-field-postal-code-and-city'),
      })
      .first()
    const countryInput = form.locator(
      '.dnb-forms-field-select-country input'
    )
    const postalCodeInput = form.locator(
      '.dnb-forms-field-postal-code-and-city__postal-code input'
    )
    const postalCodeIndicator = form.locator(
      '.dnb-forms-field-postal-code-and-city__postal-code .dnb-forms-submit-indicator-glow__status'
    )

    await countryInput.click()
    await countryInput.fill('sver')
    await page
      .locator('.dnb-drawer-list__option')
      .filter({ hasText: 'Sverige' })
      .first()
      .click()

    await expect(countryInput).toHaveValue('Sverige')

    await postalCodeInput.fill('12345')
    await expect(form.getByRole('alert')).toHaveText('Ugyldig postnummer.')
    await expect(postalCodeIndicator).not.toHaveClass(
      /dnb-forms-submit-indicator-glow__status--state-pending/
    )

    await postalCodeInput.press('Backspace')
    await postalCodeInput.press('4')
    await expect(postalCodeIndicator).toHaveClass(
      /dnb-forms-submit-indicator-glow__status--state-pending/
    )
    await postalCodeInput.blur()
    await expect(postalCodeIndicator).not.toHaveClass(
      /dnb-forms-submit-indicator-glow__status--state-pending/
    )
    await expect(form.getByRole('alert')).toHaveText('Ugyldig postnummer.')

    await form.locator('button[type="submit"]').click()
    await expect(form.locator('.dnb-form-status')).toContainText(
      'Ugyldig postnummer.'
    )
  })
})
