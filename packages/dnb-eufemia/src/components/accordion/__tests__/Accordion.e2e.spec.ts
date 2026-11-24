import { expect, test } from '@playwright/test'

test.describe('Accordion on touch devices', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/accordion/demos/?data-visual-test')
    await expect(
      page
        .locator('[data-visual-test="accordion-default"] .dnb-accordion')
        .first()
    ).toBeVisible()
  })

  test('shows the keyboard focus outline on a tapped header', async ({
    page,
  }) => {
    const header = page
      .locator(
        '[data-visual-test="accordion-default"] .dnb-accordion__header'
      )
      .first()
    const readStyles = () =>
      header.evaluate((element) => {
        const style = getComputedStyle(element)

        return {
          outline: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`,
          border: style.boxShadow,
          background: style.backgroundColor,
          color: style.color,
        }
      })

    // The focus style before any tap
    await page.keyboard.press('Shift')
    await page.keyboard.press('a')
    await header.focus()
    await expect(header).toBeFocused()
    const focusStyles = await readStyles()
    await header.blur()

    // Toggle it twice with taps, so it ends in the same state
    const expanded = await header.getAttribute('aria-expanded')
    const toggled = expanded === 'true' ? 'false' : 'true'
    await header.tap()
    await expect(header).toHaveAttribute('aria-expanded', toggled)
    await header.tap()
    await expect(header).toHaveAttribute('aria-expanded', expanded)
    await header.blur()

    // Come back with the keyboard. The tapped header keeps :hover.
    await page.keyboard.press('a')
    await header.focus()
    await expect(header).toBeFocused()
    expect(
      await header.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(readStyles).toEqual(focusStyles)
  })
})
