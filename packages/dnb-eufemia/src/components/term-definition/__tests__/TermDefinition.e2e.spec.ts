import { expect, test } from '@playwright/test'

test.describe('TermDefinition on touch devices', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(
      '/web/components/term-definition/demos/?data-visual-test'
    )
    await expect(
      page
        .locator(
          '[data-visual-test="term-definition-basic"] .dnb-term-definition__trigger'
        )
        .first()
    ).toBeVisible()
  })

  test('does not keep the hover style after the popover is closed with a tap', async ({
    page,
  }) => {
    const trigger = page
      .locator(
        '[data-visual-test="term-definition-basic"] .dnb-term-definition__trigger'
      )
      .first()
    const readStyles = () =>
      trigger.evaluate((element) => {
        const style = getComputedStyle(element)

        return {
          color: style.color,
          background: style.boxShadow,
          underline: style.textDecorationLine,
          underlineStyle: style.textDecorationStyle,
        }
      })

    const rest = await readStyles()

    await trigger.tap()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await trigger.tap()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    expect(
      await trigger.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(readStyles).toEqual(rest)
  })

  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      const input = page
        .locator(
          '[data-visual-test="term-definition-basic"] .dnb-term-definition__trigger'
        )
        .first()
      const readColors = () =>
        page
          .locator(
            '[data-visual-test="term-definition-basic"] .dnb-term-definition__trigger'
          )
          .first()
          .evaluate(
            (element) => getComputedStyle(element).textDecorationLine
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
