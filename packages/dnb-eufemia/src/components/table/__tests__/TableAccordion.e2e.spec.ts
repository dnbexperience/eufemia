import { expect, test } from '@playwright/test'

test.describe('Table accordion on touch devices', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/table/demos/?data-visual-test')
    await expect(
      page
        .locator(
          '[data-visual-test="table-accordion"] .dnb-table__tr--clickable'
        )
        .first()
    ).toBeVisible()
  })

  test('shows the keyboard focus outline on a tapped row', async ({
    page,
  }) => {
    const row = page
      .locator(
        '[data-visual-test="table-accordion"] .dnb-table__tr--clickable'
      )
      .first()
    const readStyles = () =>
      row.evaluate((element) => {
        const cell = element.querySelector('td')
        const outline = getComputedStyle(cell, '::before')

        return {
          background: getComputedStyle(cell).backgroundColor,
          top: `${outline.borderTopWidth} ${outline.borderTopColor}`,
          left: `${outline.borderLeftWidth} ${outline.borderLeftColor}`,
        }
      })

    // The focus style of an open row, before any tap
    await page.keyboard.press('a')
    await row.focus()
    await page.keyboard.press('Enter')
    await expect(row).toHaveClass(/dnb-table__tr--expanded/)
    const focusStyles = await readStyles()
    await page.keyboard.press('Enter')
    await expect(row).not.toHaveClass(/dnb-table__tr--expanded/)
    await row.blur()

    // Open it with a tap, and come back with the keyboard.
    // The tapped row keeps :hover.
    // Tap a cell without form controls, so the tap opens the row
    await row
      .locator('td')
      .filter({ hasNot: page.locator('input, button, a, label') })
      .first()
      .tap()
    await expect(row).toHaveClass(/dnb-table__tr--expanded/)
    await row.blur()
    await page.keyboard.press('a')
    await row.focus()
    await expect(row).toBeFocused()
    expect(
      await row.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(readStyles).toEqual(focusStyles)
  })
})
