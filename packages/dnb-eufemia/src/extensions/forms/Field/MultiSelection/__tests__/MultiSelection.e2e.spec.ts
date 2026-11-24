import { expect, test } from '@playwright/test'

test.describe('Field.MultiSelection', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/forms/base-fields/MultiSelection/demos/')
    await expect(
      page.locator(
        '[data-visual-test="multi-selection-variant-inline"] .dnb-forms-field-multi-selection__item'
      )
    ).not.toHaveCount(0)
  })

  test('does not keep the row hover style after a tap on touch devices', async ({
    page,
  }) => {
    const row = page
      .locator(
        '[data-visual-test="multi-selection-variant-inline"] .dnb-forms-field-multi-selection__item'
      )
      .filter({ hasText: 'Oslo' })
    const input = row.locator('.dnb-checkbox__input')
    const tapRow = async () => {
      await row.evaluate((element) =>
        element.scrollIntoView({ block: 'center', behavior: 'instant' })
      )
      const { x, y, width, height } = await row.boundingBox()
      await page.touchscreen.tap(x + width / 2, y + height / 2)
    }
    const readOutline = () =>
      row.evaluate((element) => {
        const outline = getComputedStyle(element, '::after')

        return {
          color: outline.borderTopColor,
          width: outline.borderTopWidth,
        }
      })

    const unselected = await readOutline()

    await tapRow()
    await expect(input).toBeChecked()
    await tapRow()
    await expect(input).not.toBeChecked()

    expect(
      await input.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(readOutline).toEqual(unselected)
  })

  test('shows the keyboard focus outline on a tapped row on touch devices', async ({
    page,
  }) => {
    const row = page
      .locator(
        '[data-visual-test="multi-selection-variant-inline"] .dnb-forms-field-multi-selection__item'
      )
      .filter({ hasText: 'Oslo' })
    const input = row.locator('.dnb-checkbox__input')

    await row.evaluate((element) =>
      element.scrollIntoView({ block: 'center', behavior: 'instant' })
    )
    const { x, y, width, height } = await row.boundingBox()
    await page.touchscreen.tap(x + width / 2, y + height / 2)
    await expect(input).toBeChecked()

    // Move away and back with the keyboard
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')
    await expect(input).toBeFocused()

    // The tapped row keeps :hover on touch devices
    expect(
      await row.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect
      .poll(() =>
        row.evaluate((element) => {
          const outline = getComputedStyle(element, '::after')

          return {
            color: outline.borderTopColor,
            width: outline.borderTopWidth,
          }
        })
      )
      .toEqual({ color: 'rgb(39, 106, 206)', width: '3px' })
  })
  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      const input = page
        .locator(
          '[data-visual-test="multi-selection-variant-inline"] .dnb-forms-field-multi-selection__item'
        )
        .first()
      const readColors = () =>
        page
          .locator(
            '[data-visual-test="multi-selection-variant-inline"] .dnb-forms-field-multi-selection__item'
          )
          .first()
          .evaluate(
            (element) =>
              getComputedStyle(element, '::after').borderTopColor
          )
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
