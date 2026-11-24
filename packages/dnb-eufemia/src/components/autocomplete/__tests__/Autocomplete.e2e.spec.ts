import { expect, test } from '@playwright/test'

test.describe('Autocomplete', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/autocomplete/demos/?data-visual-test')
    await expect(
      page.locator('[data-visual-test="autocomplete-closed"] .dnb-input')
    ).toBeVisible()
  })

  test('does not keep the hover border after a tap on the label on touch devices', async ({
    page,
  }) => {
    const root = page.locator('[data-visual-test="autocomplete-closed"]')
    const label = root.locator('.dnb-form-label').first()
    const input = root.locator('.dnb-input__input')
    const readBorder = () =>
      root
        .locator('.dnb-input__border')
        .evaluate((element) => getComputedStyle(element).boxShadow)

    const rest = await readBorder()

    await label.tap()
    await expect(input).toBeFocused()
    await input.evaluate((element) => element.blur())

    expect(
      await label.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(readBorder).toEqual(rest)
  })
})
