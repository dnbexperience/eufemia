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
})
