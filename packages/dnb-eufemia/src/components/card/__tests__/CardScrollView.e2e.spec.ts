import { test, expect } from '@playwright/test'

test.describe('Card inside a ScrollView', () => {
  test('should keep its outline when the ScrollView has focus', async ({
    page,
  }) => {
    await page.goto(
      '/uilib/components/card/visual-tests/inside-scroll-view/?data-visual-test'
    )
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )

    const scrollView = page.locator(
      '[data-visual-test="card-scroll-view"] .dnb-scroll-view'
    )
    const cards = scrollView.locator('.dnb-card')
    await expect(cards).toHaveCount(2)

    const getOutlines = () =>
      cards.evaluateAll((elements) =>
        elements.map(
          (element) => getComputedStyle(element, '::before').boxShadow
        )
      )
    const outlinesAtRest = await getOutlines()
    for (const outline of outlinesAtRest) {
      expect(outline).toContain('rgb(235, 235, 235)')
    }

    // Click inside the scroll view, then press a key,
    // so it gets the keyboard focus ring
    await cards.first().click()
    await page.keyboard.press('a')
    await expect(scrollView).toBeFocused()
    await expect(scrollView).not.toHaveCSS('box-shadow', 'none')

    expect(await getOutlines()).toEqual(outlinesAtRest)
  })
})
