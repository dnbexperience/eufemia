import { expect, test } from '@playwright/test'

test.describe('Checkbox', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/checkbox/demos/?data-visual-test')
    await expect(
      page.locator('[data-visual-test="checkbox-default"] .dnb-checkbox')
    ).toBeVisible()
  })

  test('does not keep the hover style after a tap on touch devices', async ({
    page,
  }) => {
    const input = page.locator(
      '[data-visual-test="checkbox-default"] .dnb-checkbox__input'
    )
    const readColors = () =>
      input.evaluate((element) => {
        const button = getComputedStyle(
          element.parentElement.querySelector('.dnb-checkbox__button')
        )

        return {
          background: button.backgroundColor,
          border: button.boxShadow,
        }
      })

    const unchecked = await readColors()

    await input.tap()
    await expect(input).toBeChecked()
    await input.tap()
    await expect(input).not.toBeChecked()

    expect(
      await input.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(readColors).toEqual(unchecked)
  })
})
