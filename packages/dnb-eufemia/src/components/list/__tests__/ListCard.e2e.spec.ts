import { test, expect, type Locator, type Page } from '@playwright/test'

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

test.describe('List.Card outline', () => {
  const fullOutline = ['2px', '2px', '2px', '2px']

  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/list/visual-tests/card-outline/')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
    await page.mouse.move(0, 0)
  })

  function getRow(page: Page, title: string) {
    return page
      .getByTestId('card-outline')
      .locator('.dnb-list__item')
      .filter({ hasText: title })
  }

  // Press Tab from the button before the card until the target has focus,
  // so the browser sets the focus the same way as for a keyboard user.
  async function tabTo(page: Page, target: Locator) {
    await page.getByTestId('before-card').focus()
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab')
      if (
        await target.evaluate(
          (element) => element === document.activeElement
        )
      ) {
        return
      }
    }
    throw new Error('Tab did not reach the target')
  }

  test('should show the full outline on the first, a middle and the last row on keyboard focus', async ({
    page,
  }) => {
    for (const title of ['First row', 'Middle row', 'Last row']) {
      const row = getRow(page, title)
      await tabTo(page, row.locator('.dnb-list__item__action__button'))

      expect(await getBorderWidths(row), title).toEqual(fullOutline)
    }
  })

  test('should show the full outline on link and accordion rows on keyboard focus', async ({
    page,
  }) => {
    for (const [title, focusable] of [
      ['Link row', 'a'],
      ['Accordion row', '.dnb-list__item__accordion__header'],
    ]) {
      const row = getRow(page, title)
      await tabTo(page, row.locator(focusable))

      expect(await getBorderWidths(row), title).toEqual(fullOutline)
    }
  })

  test('should not show the row outline when a footer control has focus', async ({
    page,
  }) => {
    const row = getRow(page, 'Footer row')

    await tabTo(page, row.locator('.dnb-list__item__action__button'))
    expect(await getBorderWidths(row)).toEqual(fullOutline)

    // The footer button shows its own focus ring.
    // WebKit on macOS skips buttons on Tab, so set the focus after a key press.
    const footerButton = row.getByRole('button', { name: 'Footer action' })
    await page.keyboard.press('a')
    await footerButton.focus()
    await expect(footerButton).toBeFocused()
    expect(await getBorderWidths(row)).toEqual([
      '1px',
      '0px',
      '1px',
      '0px',
    ])
  })
})
