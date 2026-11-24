import { expect, test } from '@playwright/test'

test.describe('TableOfContent on touch devices', () => {
  test.use({ hasTouch: true, viewport: { width: 1280, height: 900 } })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/patterns-and-extensions/table-of-content/demos/')
    await expect(
      page.locator(
        '[data-visual-test="table-of-content-article"] .dnb-table-of-content__link'
      )
    ).not.toHaveCount(0)

    // Keep the current section, so only the hover state can change
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

  const readStyles = (link) =>
    link.evaluate((element) => {
      const style = getComputedStyle(element)
      const marker = element
        .closest('.dnb-table-of-content__list-wrapper')
        ?.querySelector('.dnb-table-of-content__marker')

      return {
        color: style.color,
        background: style.boxShadow,
        underline: style.textDecorationLine,
        marker: marker ? getComputedStyle(marker).boxShadow : null,
      }
    })

  test('does not keep the hover style on a link after a tap', async ({
    page,
  }) => {
    for (const selector of [
      '[data-visual-test="table-of-content-article"] .dnb-table-of-content__link:not([aria-current])',
      '[data-visual-test="table-of-content-article"] .dnb-table-of-content__link[aria-current]',
      '.dnb-table-of-content--sidebar .dnb-table-of-content__link:not([aria-current])',
    ]) {
      await test.step(selector, async () => {
        const link = page.locator(selector).first()
        await link.scrollIntoViewIfNeeded()
        const rest = await readStyles(link)

        await link.tap()

        expect(
          await link.evaluate((element) => element.matches(':hover'))
        ).toBe(true)
        await expect.poll(() => readStyles(link)).toEqual(rest)
      })
    }
  })
})
