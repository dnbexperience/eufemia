import { test, expect } from '@playwright/test'

for (const width of [400, 1024]) {
  const minimumLongRowHeight = width === 400 ? 80 : 64

  test.describe(`List at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    test('keeps primary actions and footer controls independent', async ({
      page,
      browserName,
    }) => {
      await page.addInitScript(() => {
        window['IS_TEST'] = true
      })
      await page.goto('/uilib/components/list/visual-tests/action-footer/')

      const example = page.locator(
        '[data-visual-test="list-action-footer"]'
      )
      const item = example.locator('.dnb-list__item__action').first()
      const trigger = item.getByRole('button', { name: /Payment details/ })
      const save = item.getByRole('button', { name: 'Save payment' })
      const footer = item.locator('.dnb-list__item__footer')

      await expect(save).toBeVisible()
      await page.evaluate(() => document.fonts.ready)

      const itemBox = await item.boundingBox()
      const footerBox = await footer.boundingBox()
      const triggerBox = await trigger.boundingBox()

      expect(footerBox.y).toBeGreaterThanOrEqual(
        triggerBox.y + triggerBox.height - 1
      )
      expect(footerBox.y + footerBox.height).toBeCloseTo(
        itemBox.y + itemBox.height,
        0
      )
      expect(footerBox.x).toBeCloseTo(itemBox.x, 0)
      expect(footerBox.width).toBeCloseTo(itemBox.width, 0)

      await footer.click({ position: { x: 8, y: 8 } })
      await expect(page.getByRole('dialog')).toHaveCount(0)
      await save.click()
      await expect(item.getByRole('status')).toHaveText('Saved')
      await expect(page.getByRole('dialog')).toHaveCount(0)

      await trigger.focus()
      await expect(item).toHaveCSS('--list-item-outline-width', '0.125rem')
      await page.keyboard.press(
        browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
      )
      await expect(save).toBeFocused()
      await page.keyboard.press('Enter')
      await page.keyboard.press('Space')
      await expect(page.getByRole('dialog')).toHaveCount(0)

      for (const key of ['Enter', 'Space']) {
        await trigger.focus()
        await page.keyboard.press(key)
        await expect(page.getByRole('dialog')).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(page.getByRole('dialog')).toHaveCount(0)
        await expect(page.locator('html')).not.toHaveAttribute(
          'data-dnb-modal-active'
        )
      }

      await trigger.click({ position: { x: 8, y: 8 } })
      await expect(page.getByRole('dialog')).toBeVisible()
    })

    test('keeps footer links separate and rounds the entire last item', async ({
      page,
      browserName,
    }) => {
      await page.goto('/uilib/components/list/visual-tests/action-footer/')

      const item = page
        .locator(
          '[data-visual-test="list-action-footer"] .dnb-list__item__action'
        )
        .last()
      const trigger = item.locator(':scope > a')
      const help = item.getByRole('link', { name: 'Payment help' })
      const footer = item.locator('.dnb-list__item__footer')

      await expect(help).toBeVisible()
      await expect(help).not.toHaveCSS('display', 'grid')
      await expect(footer).toHaveCSS(
        'border-bottom-left-radius',
        await item.evaluate(
          (element) => getComputedStyle(element).borderBottomLeftRadius
        )
      )
      await expect(footer).not.toHaveCSS(
        'border-bottom-left-radius',
        '0px'
      )

      await help.click()
      await expect(page).toHaveURL(/#footer-help$/)
      await trigger.focus()
      await expect(trigger).toBeFocused()
      await page.keyboard.press('Space')
      await expect(page).toHaveURL(/#footer-details$/)
      await trigger.focus()
      await page.keyboard.press(
        browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
      )
      await expect(help).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(page).toHaveURL(/#footer-help$/)
    })

    test('joins nested list corners to the accordion header', async ({
      page,
    }) => {
      await page.goto('/uilib/components/list/visual-tests/action-footer/')

      const example = page.locator(
        '[data-visual-test="list-action-footer"]'
      )
      const row = example.locator('.dnb-list__item__action').first()
      const trigger = row.locator('[role="button"]')
      const footerButton = row.locator('button')

      for (const target of [trigger, footerButton]) {
        await target.focus()
        await expect(row).toHaveCSS('border-top-left-radius', '0px')
        await expect(row).toHaveCSS('border-top-right-radius', '0px')
        expect(
          await row.evaluate(
            (element) =>
              getComputedStyle(element, '::after').borderTopLeftRadius
          )
        ).toBe('0px')
      }

      const accordion = example
        .locator('.dnb-list__item__accordion')
        .first()
      await expect(accordion).not.toHaveCSS(
        'border-top-left-radius',
        '0px'
      )
      const lastRow = example.locator('.dnb-list__item__action').last()
      await expect(lastRow).not.toHaveCSS(
        'border-bottom-left-radius',
        '0px'
      )

      for (const testId of [
        'inset-list',
        'separated-list',
        'standalone-list',
      ]) {
        const first = page
          .getByTestId(testId)
          .locator('.dnb-list__item')
          .first()
        await expect(first).not.toHaveCSS('border-top-left-radius', '0px')
        await expect(first).not.toHaveCSS('border-top-right-radius', '0px')
      }
    })

    test('excludes disabled and pending footer controls from keyboard navigation', async ({
      page,
    }) => {
      await page.goto('/uilib/components/list/visual-tests/action-footer/')

      for (const state of ['disabled', 'pending', 'inherited-disabled']) {
        const item = page.getByTestId(state)
        const footerButton = item.locator('button')
        await expect(footerButton).toBeVisible()
        await footerButton.evaluate((element: HTMLElement) =>
          element.focus()
        )
        await expect(footerButton).not.toBeFocused()
        await expect(item.locator('[role="button"]')).toHaveAttribute(
          'tabindex',
          '-1'
        )
      }
    })

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

test.describe('List nested row alignment', () => {
  test.use({ viewport: { width: 1024, height: 900 } })

  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/uilib/components/list/visual-tests/nested-alignment/'
    )
    await page.evaluate(() => document.fonts.ready)
  })

  // A Subline or Overline in one row must not change the alignment of
  // the other rows in the same nested list.
  for (const testId of [
    'subline-in-nested-row',
    'subline-in-accordion-header',
  ]) {
    test(`aligns each nested row with its own title (${testId})`, async ({
      page,
    }) => {
      const rows = page
        .getByTestId(testId)
        .locator('.dnb-list__item__accordion__content .dnb-list__item')
      await expect(rows.first()).toBeVisible()

      const offsets = await rows.evaluateAll((items) =>
        items.map((item) => {
          const middle = (rect: DOMRect) => rect.top + rect.height / 2
          const textMiddle = (element: Element) => {
            const range = document.createRange()
            range.selectNodeContents(element)
            return middle(range.getBoundingClientRect())
          }

          const titleText = Array.from(
            item.querySelector('.dnb-list__item__title > span').childNodes
          ).find((node) => node.nodeType === Node.TEXT_NODE)
          const titleRange = document.createRange()
          titleRange.selectNodeContents(titleText)
          const title = middle(titleRange.getBoundingClientRect())

          return {
            icon:
              middle(
                item
                  .querySelector('.dnb-list__item__icon .dnb-icon')
                  .getBoundingClientRect()
              ) - title,
            end:
              textMiddle(item.querySelector('.dnb-list__item__end')) -
              title,
            chevron:
              middle(
                item
                  .querySelector('.dnb-list__item__chevron .dnb-icon')
                  .getBoundingClientRect()
              ) - title,
          }
        })
      )

      expect(offsets.length).toBeGreaterThan(0)

      for (const offset of offsets) {
        expect(Math.abs(offset.icon)).toBeLessThanOrEqual(1)
        expect(Math.abs(offset.end)).toBeLessThanOrEqual(1)
        expect(Math.abs(offset.chevron)).toBeLessThanOrEqual(1)
      }
    })
  }
})
