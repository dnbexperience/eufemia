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

test.describe('Table cells on touch devices', () => {
  test.use({ hasTouch: true })

  const getRing = (button) =>
    button.evaluate((element) => {
      const style = getComputedStyle(element, '::before')

      return `${style.borderTopWidth} ${style.borderTopColor}`
    })

  test('shows the selected border on a tapped cell', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/table/demos/')
    const button = page
      .locator(
        '[data-visual-test="table-navigation-cell"] .dnb-table__td__button[aria-pressed]'
      )
      .first()
    await expect(button).toHaveAttribute('aria-pressed', 'false')

    await button.tap()
    await expect(button).toHaveAttribute('aria-pressed', 'true')

    expect(
      await button.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(() => getRing(button)).toBe('1px rgb(8, 69, 77)')
  })
})

test.describe('Table sort button on touch devices', () => {
  test.use({ hasTouch: true })

  test('does not show the underline on the active sort button after a tap', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/table/demos/?data-visual-test')
    const button = page
      .locator('th.dnb-table--active .dnb-table__sort-button')
      .first()
    const text = button.locator('.dnb-button__text')
    const readUnderline = () =>
      text.evaluate(
        (element) => getComputedStyle(element).textDecorationColor
      )
    await expect(button).toBeVisible()
    const rest = await readUnderline()

    await button.tap()
    await button.blur()

    // Read the value after the color transition
    await text.evaluate((element) =>
      Promise.all(element.getAnimations().map(({ finished }) => finished))
    )
    expect(
      await button.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    expect(await readUnderline()).toBe(rest)
  })
})
