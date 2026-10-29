import { expect, test } from '@playwright/test'

test.describe('DrawerList inside a Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/dialog/demos/?data-visual-test')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
  })

  test('closes only the list when Escape is pressed while it opens', async ({
    page,
  }) => {
    const opener = page.getByRole('button', {
      name: 'Show information dialog with sticky header',
    })
    const openerId = await opener.getAttribute('id')
    await opener.click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    // The Dialog handles Escape once it has locked the page behind it
    await expect(page.locator(`[id="${openerId}"]`)).toHaveAttribute(
      'tabindex',
      '-1'
    )

    const countryCode = dialog.locator(
      '.dnb-forms-field-phone-number__country-code input'
    )
    await countryCode.click()
    await expect(countryCode).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')

    await expect(countryCode).toHaveAttribute('aria-expanded', 'false')
    await expect(dialog).toBeVisible()
  })
})
