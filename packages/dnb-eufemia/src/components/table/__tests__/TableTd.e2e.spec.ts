import { test, expect, type Locator } from '@playwright/test'

function getRing(button: Locator) {
  return button.evaluate((element) => {
    const style = getComputedStyle(element, '::before')
    return `${style.borderTopWidth} ${style.borderTopColor}`
  })
}

test.describe('Td with onClick', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/web/components/table/demos/')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
  })

  test('should show the focus ring on a selected cell', async ({
    page,
  }) => {
    const button = page
      .locator(
        '[data-visual-test="table-navigation-cell"] .dnb-table__td__button[aria-pressed]'
      )
      .first()
    const focusRing = '4px rgb(39, 106, 206)'
    const selectedBorder = '1px rgb(8, 69, 77)'

    // Use the keyboard to focus and select the cell
    await page.keyboard.press('a')
    await button.focus()
    await page.keyboard.press('Space')
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(button).toBeFocused()

    expect(await getRing(button)).toBe(focusRing)

    // Keep the selected border when focus leaves the cell
    await page.keyboard.press('Tab')
    await expect(button).not.toBeFocused()

    expect(await getRing(button)).toBe(selectedBorder)
  })
})
