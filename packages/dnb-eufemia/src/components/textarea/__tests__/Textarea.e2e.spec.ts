import { expect, test } from '@playwright/test'

test.describe('Textarea', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/textarea/demos/?data-visual-test')
    await expect(
      page.locator('[data-visual-test="textarea-default"] .dnb-textarea')
    ).toBeVisible()
  })

  test('does not keep the hover border after a tap on touch devices', async ({
    page,
  }) => {
    const textarea = page.locator(
      '[data-visual-test="textarea-default"] .dnb-textarea__textarea'
    )
    const readBorder = () =>
      page
        .locator(
          '[data-visual-test="textarea-default"] .dnb-textarea__state'
        )
        .evaluate((element) => getComputedStyle(element).boxShadow)

    const rest = await readBorder()

    await textarea.tap()
    await expect(textarea).toBeFocused()
    await textarea.evaluate((element) => element.blur())

    expect(
      await textarea.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(readBorder).toEqual(rest)
  })

  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      const input = page
        .locator(
          '[data-visual-test="textarea-default"] .dnb-textarea__textarea'
        )
        .first()
      const readColors = () =>
        page
          .locator(
            '[data-visual-test="textarea-default"] .dnb-textarea__state'
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
