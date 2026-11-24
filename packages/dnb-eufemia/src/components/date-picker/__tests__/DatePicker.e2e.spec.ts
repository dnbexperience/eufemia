import { expect, test } from '@playwright/test'

test.describe('DatePicker on touch devices', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/date-picker/demos/?data-visual-test')
    await expect(
      page.locator(
        '[data-visual-test="date-picker-trigger-default"] .dnb-date-picker'
      )
    ).toBeVisible()
  })

  test('does not keep the hover style on the month buttons after a tap', async ({
    page,
  }) => {
    await page
      .locator('[data-visual-test="date-picker-trigger-default"] button')
      .first()
      .tap()

    const next = page.locator(
      '.dnb-date-picker__portal .dnb-date-picker__next'
    )
    await expect(next).toBeVisible()
    const title = page
      .locator('.dnb-date-picker__portal .dnb-date-picker__header__title')
      .first()
    const readStyles = () =>
      next.evaluate((element) => {
        const style = getComputedStyle(element)

        return {
          background: style.backgroundColor,
          border: style.boxShadow,
        }
      })

    const rest = await readStyles()
    const month = await title.textContent()

    await next.tap()
    await expect(title).not.toHaveText(month)

    expect(
      await next.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(readStyles).toEqual(rest)
  })
})
