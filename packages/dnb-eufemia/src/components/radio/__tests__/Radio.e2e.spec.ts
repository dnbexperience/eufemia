import { expect, test } from '@playwright/test'

test.describe('Radio', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/radio/demos/?data-visual-test')
    await expect(
      page.locator('[data-visual-test="radio-group"] .dnb-radio').first()
    ).toBeVisible()
  })

  test('does not keep the hover style after a tap on touch devices', async ({
    page,
  }) => {
    const inputs = page.locator(
      '[data-visual-test="radio-group"] .dnb-radio__input'
    )
    const first = inputs.nth(0)
    const second = inputs.nth(1)
    const readColors = (input: typeof first) =>
      input.evaluate((element) => {
        const button = getComputedStyle(
          element.parentElement.querySelector('.dnb-radio__button')
        )
        const dot = getComputedStyle(
          element.parentElement.querySelector('.dnb-radio__dot')
        )

        return {
          background: button.backgroundColor,
          border: button.boxShadow,
          dot: dot.backgroundColor,
        }
      })

    await expect(first).toBeChecked()
    const checked = await readColors(first)

    await second.tap()
    await expect(second).toBeChecked()

    expect(
      await second.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(() => readColors(second)).toEqual(checked)
  })
})
