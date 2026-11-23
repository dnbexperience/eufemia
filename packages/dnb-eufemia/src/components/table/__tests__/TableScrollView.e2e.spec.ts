import { test, expect, type Page } from '@playwright/test'

// Click inside the scroll view, then press a key,
// so it gets the keyboard focus ring.
async function focusScrollViewWithKeyboard(page: Page, example: string) {
  const scrollView = page
    .locator(`[data-visual-test="${example}"] .dnb-table__scroll-view`)
    .first()
  await expect(scrollView).toHaveAttribute('tabindex', '0')

  await expect(page.locator('html')).toHaveAttribute(
    'data-whatinput',
    /initial|keyboard|mouse|touch/
  )
  await scrollView.locator('th').first().click()
  await page.keyboard.press('a')

  await expect(page.locator('html')).toHaveAttribute(
    'data-whatinput',
    'keyboard'
  )
  await expect(scrollView).toBeFocused()
  await expect(scrollView).toHaveCSS('outline-style', 'solid')
  await expect(scrollView).toHaveCSS('outline-width', '3px')
  await expect(scrollView).toHaveCSS('outline-offset', '0px')

  return scrollView
}

test.describe('Table.ScrollView focus ring', () => {
  test.beforeEach(async ({ page }) => {
    // Make the tables wider than the scroll view, so it gets focusable
    await page.setViewportSize({ width: 375, height: 1024 })
    await page.goto('/web/components/table/demos/')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
  })

  test('keeps the card menu keyboard focus clear of the table', async ({
    page,
  }) => {
    const example = page.locator('[data-visual-test="table-in-card"]')
    const button = example.locator('.dnb-popover__trigger')

    for (const width of [1280, 375]) {
      await test.step(`viewport width ${width}`, async () => {
        await page.setViewportSize({ width, height: 1024 })
        await button.scrollIntoViewIfNeeded()
        await button.focus()
        await page.keyboard.press('Shift')
        await expect(button).toBeFocused()
        await expect(button).toHaveCSS('outline-width', '3px')

        await expect
          .poll(() =>
            button.evaluate((element) => {
              const rect = element.getBoundingClientRect()
              const style = getComputedStyle(element)
              const outline = parseFloat(style.outlineWidth)
              const offset = parseFloat(style.outlineOffset)
              const belowButton = document.elementFromPoint(
                rect.x + rect.width / 2,
                rect.bottom + offset + outline / 2
              )

              return Boolean(belowButton?.closest('.dnb-table'))
            })
          )
          .toBe(false)

        await page.keyboard.press('Enter')
        await expect(page.getByRole('menu')).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(button).toBeFocused()
      })
    }
  })

  test('should not show a ring on clickable cells', async ({ page }) => {
    const scrollView = await focusScrollViewWithKeyboard(
      page,
      'table-navigation-cell'
    )

    const rings = await scrollView
      .locator('.dnb-table__td__button')
      .evaluateAll((buttons) =>
        buttons.map((button) => {
          const style = getComputedStyle(button, '::before')
          return `${style.borderTopWidth} ${style.borderTopColor}`
        })
      )

    expect(rings).toHaveLength(9)
    expect(new Set(rings)).toEqual(new Set(['0px rgba(0, 0, 0, 0)']))
  })

  test('should not show a ring on clickable rows', async ({ page }) => {
    const scrollView = await focusScrollViewWithKeyboard(
      page,
      'table-accordion'
    )

    const colors = await scrollView
      .locator('tr.dnb-table__tr--clickable > td')
      .evaluateAll((cells) =>
        cells.map(
          (cell) => getComputedStyle(cell, '::before').borderTopColor
        )
      )

    expect(colors.length).toBeGreaterThan(0)
    expect(new Set(colors)).toEqual(new Set(['rgba(0, 0, 0, 0)']))
  })
})
