import { test, expect } from '@playwright/test'

for (const width of [400, 1024]) {
  const minimumLongRowHeight = width === 400 ? 80 : 64

  test.describe(`List at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    test('pads plain text and title-only rows on both sides', async ({
      page,
    }) => {
      await page.goto('/uilib/components/list/demos/?data-visual-test')

      const list = page.locator(
        '[data-visual-test="list-plain-text"] .dnb-list'
      )
      await expect(list).toBeVisible()
      await expect(list.locator(':scope > li')).toHaveCount(4)
      await page.evaluate(() => document.fonts.ready)

      const rows = await list.locator(':scope > li').evaluateAll((items) =>
        items.map((item) => {
          const title = item.querySelector('.dnb-list__item__title')
          const text = document.createRange()
          text.selectNodeContents(title ?? item)

          const rowRect = item.getBoundingClientRect()
          const textRect = text.getBoundingClientRect()
          const titleStyle = title && getComputedStyle(title)

          return {
            hasTitle: Boolean(title),
            paddingLeft: titleStyle?.paddingLeft,
            paddingRight: titleStyle?.paddingRight,
            left: textRect.left - rowRect.left,
            right: rowRect.right - textRect.right,
            height: rowRect.height,
            overflows: item.scrollWidth > item.clientWidth,
          }
        })
      )

      for (const row of rows) {
        expect(row.hasTitle).toBe(true)
        expect(row.paddingLeft).toBe('16px')
        expect(row.paddingRight).toBe('16px')
        expect(row.left).toBeCloseTo(16, 0)
        expect(row.right).toBeGreaterThanOrEqual(15.5)
        expect(row.overflows).toBe(false)
      }

      expect(rows[1].height).toBe(rows[2].height)
      expect(rows[2].height).toBe(rows[3].height)
      expect(rows[1].height).toBeGreaterThanOrEqual(minimumLongRowHeight)
    })

    test('preserves leading cells and custom title padding', async ({
      page,
    }) => {
      await page.goto('/uilib/components/list/demos/?data-visual-test')

      const titles = page.locator(
        '[data-visual-test="list-title-spacing"] .dnb-list__item__title'
      )
      await expect(titles).toHaveCount(4)

      await expect(titles.nth(0)).toHaveCSS('padding-right', '16px')
      await expect(titles.nth(1)).toHaveCSS('padding-right', '16px')
      await expect(titles.nth(2)).toHaveCSS('padding-right', '32px')
      await expect(titles.nth(3)).toHaveCSS('padding-right', '0px')
    })

    test('keeps spacing between existing cells and chevrons', async ({
      page,
    }) => {
      await page.goto('/uilib/components/list/demos/?data-visual-test')

      const cells = page.locator('[data-visual-test="list-slots"]')
      const actions = page.locator('[data-visual-test="list-action"]')

      await expect(
        cells.locator('.dnb-list__item__title').first()
      ).toHaveCSS('padding-right', '0px')
      await expect(
        cells.locator('.dnb-list__item__start').first()
      ).toHaveCSS('padding-left', '16px')
      await expect(
        cells.locator('.dnb-list__item__end').first()
      ).toHaveCSS('padding-right', '24px')
      await expect(
        actions.locator('.dnb-list__item__title').first()
      ).toHaveCSS('padding-right', '0px')
    })
  })
}
