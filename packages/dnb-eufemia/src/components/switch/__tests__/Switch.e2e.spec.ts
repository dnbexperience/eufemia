import { expect, test } from '@playwright/test'

test.describe('Switch', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/switch/demos/?data-visual-test')
    await expect(
      page.locator('[data-visual-test="switch-default"] .dnb-switch')
    ).toBeVisible()
  })

  test('does not keep the hover style after a tap on touch devices', async ({
    page,
  }) => {
    const input = page.locator(
      '[data-visual-test="switch-default"] .dnb-switch__input'
    )
    const readColors = () =>
      input.evaluate((element) => {
        const root = element.closest('.dnb-switch')
        const background = getComputedStyle(
          root.querySelector('.dnb-switch__background')
        )
        const button = getComputedStyle(
          root.querySelector('.dnb-switch__button')
        )

        return {
          background: background.backgroundColor,
          border: background.borderColor,
          button: button.backgroundColor,
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
