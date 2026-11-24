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

  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      const input = page
        .locator(
          '[data-visual-test="input-placeholder"] .dnb-input__input'
        )
        .first()
      const readColors = () =>
        page
          .locator(
            '[data-visual-test="input-placeholder"] .dnb-input__border'
          )
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
