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

  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      await page
        .locator('[data-visual-test="date-picker-trigger-default"] button')
        .first()
        .click()
      const input = page
        .locator('.dnb-date-picker__portal .dnb-date-picker__next')
        .first()
      const readColors = () =>
        page
          .locator('.dnb-date-picker__portal .dnb-date-picker__next')
          .first()
          .evaluate((element) => getComputedStyle(element).boxShadow)
      const rest = await readColors()

      expect(
        await page.evaluate(() => matchMedia('(hover: hover)').matches)
      ).toBe(true)
      await input.hover()
      await expect.poll(readColors).not.toEqual(rest)

      // Keep native :hover while changing the input, as hybrid devices can do.
      await input.dispatchEvent('pointerdown', { pointerType: 'touch' })
      await expect(page.locator('html')).toHaveAttribute(
        'data-whatintent',
        'touch'
      )
      await expect.poll(readColors).toEqual(rest)

      await page.clock.install()
      await page.clock.fastForward(250)
      await page.mouse.move(0, 0)
      await input.hover()
      await expect(page.locator('html')).toHaveAttribute(
        'data-whatintent',
        'mouse'
      )
      await expect.poll(readColors).not.toEqual(rest)
    })
  })
})
