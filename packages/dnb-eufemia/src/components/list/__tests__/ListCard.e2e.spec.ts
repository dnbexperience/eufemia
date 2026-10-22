import { test, expect, type Locator } from '@playwright/test'

function getBorderWidths(item: Locator) {
  return item.evaluate((element) => {
    const style = getComputedStyle(element, '::after')
    return [
      style.borderTopWidth,
      style.borderRightWidth,
      style.borderBottomWidth,
      style.borderLeftWidth,
    ]
  })
}

test.describe('List.Card', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/list/demos/')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
  })

  test('should show the full outline of an action item on keyboard focus', async ({
    page,
  }) => {
    const item = page
      .locator('[data-visual-test="list-card"] .dnb-list__item__action')
      .nth(1)
    const button = item.locator('.dnb-list__item__action__button')
    const fullOutline = ['2px', '2px', '2px', '2px']

    await item.hover()
    expect(await getBorderWidths(item)).toEqual(fullOutline)

    // Use the keyboard to focus the item
    await page.mouse.move(0, 0)
    await page.keyboard.press('a')
    await button.focus()
    await expect(button).toBeFocused()

    expect(await getBorderWidths(item)).toEqual(fullOutline)
  })
})
