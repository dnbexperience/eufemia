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

  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      const input = page.locator(
        '[data-visual-test="checkbox-default"] .dnb-checkbox__input'
      )
      const readColors = () =>
        input.evaluate((element) => {
          const root = element.closest('.dnb-checkbox')
          return ['.dnb-checkbox__button'].map(
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
