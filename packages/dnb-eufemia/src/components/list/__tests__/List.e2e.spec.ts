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
          text.selectNodeContents(title?.firstElementChild ?? item)

          const rowRect = item.getBoundingClientRect()
          const textRect = text.getBoundingClientRect()

          return {
            left: textRect.left - rowRect.left,
            right: rowRect.right - textRect.right,
            height: rowRect.height,
            overflows: item.scrollWidth > item.clientWidth,
          }
        })
      )

      for (const row of rows) {
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

test.describe('List text layout compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/list/visual-tests/text-layout/')
  })

  for (const layoutEngine of ['legacy', 'css']) {
    test(`keeps interpolated text on one line with ${layoutEngine}`, async ({
      page,
    }) => {
      const list = page.getByTestId(layoutEngine)
      await expect(list).toBeVisible()
      await page.evaluate(() => document.fonts.ready)

      for (const testId of ['interpolation', 'fragment', 'pending']) {
        const row = list.getByTestId(testId)
        const text = await row.evaluate((item) => {
          const walker = document.createTreeWalker(
            item,
            NodeFilter.SHOW_TEXT
          )
          const rects: DOMRect[] = []
          while (walker.nextNode()) {
            const range = document.createRange()
            range.selectNode(walker.currentNode)
            rects.push(
              ...Array.from(range.getClientRects()).filter(
                (rect) => rect.width > 0 && rect.height > 0
              )
            )
          }
          return {
            lines: new Set(rects.map((rect) => rect.top)).size,
            left: rects[0].left - item.getBoundingClientRect().left,
          }
        })

        expect(text.lines).toBe(1)
        expect(text.left).toBeCloseTo(16, 0)
      }
    })

    test(`preserves custom content and padding with ${layoutEngine}`, async ({
      page,
    }) => {
      const list = page.getByTestId(layoutEngine)
      await expect(list.getByTestId('custom-padding')).toHaveCSS(
        'padding-left',
        '32px'
      )
      await expect(list.getByTestId('custom-padding')).toHaveCSS(
        'padding-right',
        '32px'
      )
      await expect(
        list.getByTestId('custom-content').locator('[style*=background]')
      ).toHaveCSS('padding', '32px')
      await expect(
        list.getByTestId('custom-space').locator(':scope > .dnb-space')
      ).toHaveCSS('padding', '32px')
      for (const testId of [
        'custom-content',
        'custom-space',
        'filter',
        'nested-cells',
      ]) {
        const row = list.getByTestId(testId)
        await expect(row).toHaveCSS('grid-template-areas', /chevron-left/)
        await expect(row).toHaveCSS('padding-left', '0px')
        await expect(row).toHaveCSS('padding-right', '0px')
      }
      await expect(list.getByTestId('hidden')).toBeHidden()
    })
  }

  test('does not add list surface padding to standalone text', async ({
    page,
  }) => {
    const row = page.getByTestId('standalone')

    await expect(row).toHaveCSS('padding-left', '0px')
    await expect(row).toHaveCSS('padding-right', '0px')
    await expect(row.locator('div')).toHaveCount(0)
  })

  test('keeps limited text rows hidden until expanded', async ({
    page,
  }) => {
    const rows = page.locator('#text-layout-more > li')

    await expect(rows.nth(0)).toBeVisible()
    await expect(rows.nth(1)).toBeHidden()
    await page.getByRole('button', { name: 'Vis mer' }).click()
    await expect(rows.nth(1)).toBeVisible()
  })
})
