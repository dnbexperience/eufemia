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
})
