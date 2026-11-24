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

  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      const input = page.locator(
        '[data-visual-test="switch-default"] .dnb-switch__input'
      )
      const readColors = () =>
        input.evaluate((element) => {
          const root = element.closest('.dnb-switch')
          return ['.dnb-switch__background', '.dnb-switch__button'].map(
            (selector) =>
              getComputedStyle(root.querySelector(selector))
                .backgroundColor
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
