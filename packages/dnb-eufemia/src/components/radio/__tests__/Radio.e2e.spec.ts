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

  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      const input = page.locator(
        '[data-visual-test="radio-default"] .dnb-radio__input'
      )
      const readColors = () =>
        input.evaluate((element) => {
          const root = element.closest('.dnb-radio')
          return ['.dnb-radio__button'].map(
            (selector) =>
              getComputedStyle(root.querySelector(selector)).boxShadow
          )
        })
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
