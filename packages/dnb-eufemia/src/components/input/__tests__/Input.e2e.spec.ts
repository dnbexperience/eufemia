import { expect, test } from '@playwright/test'

test.describe('Input', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/input/demos/?data-visual-test')
    await expect(
      page.locator('[data-visual-test="input-placeholder"] .dnb-input')
    ).toBeVisible()
  })

  const readBorder = (page) =>
    page
      .locator('[data-visual-test="input-placeholder"] .dnb-input__border')
      .evaluate((element) => getComputedStyle(element).boxShadow)

  test('does not keep the hover border after a tap on touch devices', async ({
    page,
  }) => {
    const input = page.locator(
      '[data-visual-test="input-placeholder"] .dnb-input__input'
    )
    const rest = await readBorder(page)

    await input.tap()
    await expect(input).toBeFocused()
    await input.evaluate((element) => element.blur())

    expect(
      await input.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(() => readBorder(page)).toEqual(rest)
  })

  test('does not keep the hover border after a tap on the label on touch devices', async ({
    page,
  }) => {
    const label = page.locator(
      '[data-visual-test="input-placeholder"] .dnb-form-label'
    )
    const input = page.locator(
      '[data-visual-test="input-placeholder"] .dnb-input__input'
    )
    const rest = await readBorder(page)

    await label.tap()
    await expect(input).toBeFocused()
    await input.evaluate((element) => element.blur())

    // FormLabel marks the field as hovered while the label has the mouse
    await expect(
      page.locator(
        '[data-visual-test="input-placeholder"] .dnb-input__border'
      )
    ).toHaveClass(/\bhover\b/)
    await expect.poll(() => readBorder(page)).toEqual(rest)
  })
})
