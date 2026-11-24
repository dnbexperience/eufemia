import { expect, test } from '@playwright/test'

test.describe('Anchor on touch devices', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/anchor/demos/?data-visual-test')
    await expect(
      page.locator('[data-visual-test="anchor-basic"] .dnb-anchor')
    ).toBeVisible()

    // Stay on the page when the link is tapped
    await page.evaluate(() => {
      document.addEventListener(
        'click',
        (event) => {
          event.preventDefault()
          event.stopPropagation()
        },
        true
      )
    })
  })

  test('does not keep the hover style after a tap', async ({ page }) => {
    const anchor = page.locator(
      '[data-visual-test="anchor-basic"] .dnb-anchor'
    )
    const readStyles = () =>
      anchor.evaluate((element) => {
        const style = getComputedStyle(element)

        return { color: style.color, background: style.boxShadow }
      })

    const rest = await readStyles()

    await anchor.tap()

    expect(
      await anchor.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(readStyles).toEqual(rest)
  })

  test.describe('with a mouse and touchscreen', () => {
    test.use({ hasTouch: false })

    test('switches hover styles with the current input', async ({
      page,
    }) => {
      const input = page
        .locator('[data-visual-test="anchor-basic"] .dnb-anchor')
        .first()
      const readColors = () =>
        page
          .locator('[data-visual-test="anchor-basic"] .dnb-anchor')
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
