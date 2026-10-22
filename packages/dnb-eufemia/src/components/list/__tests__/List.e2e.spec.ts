import { test, expect } from '@playwright/test'
import { PNG } from 'pngjs'

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
      await page.waitForFunction(() =>
        document.documentElement.hasAttribute('data-portal-ready')
      )

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
      await expect(example).not.toContainText('Saved')
      await expect(example).not.toContainText('Payment history details.')
      await expect(example).not.toContainText('Help with payments.')
      await expect(page.getByRole('dialog')).toHaveCount(0)

      await trigger.focus()
      expect(
        await item.evaluate(
          (element) => getComputedStyle(element, '::after').borderTopWidth
        )
      ).toBe('2px')
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
      await page.waitForFunction(() =>
        document.documentElement.hasAttribute('data-portal-ready')
      )

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
      await page.waitForFunction(() =>
        document.documentElement.hasAttribute('data-portal-ready')
      )

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

    test('only highlights the primary action for keyboard focus', async ({
      page,
      browserName,
    }) => {
      await page.goto('/uilib/components/list/visual-tests/action-footer/')
      await page.waitForFunction(() =>
        document.documentElement.hasAttribute('data-portal-ready')
      )
      const rows = page.locator(
        '[data-visual-test="list-action-footer"] .dnb-list__item__action'
      )
      await page.mouse.move(0, 0)

      for (const row of [rows.first(), rows.last()]) {
        const primary = row.locator(':scope > [role="button"], :scope > a')
        const footer = row.locator(
          '.dnb-list__item__footer button, .dnb-list__item__footer a'
        )
        await primary.focus()
        await page.keyboard.press(
          browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
        )
        await expect(footer).toBeFocused()
        expect(
          await footer.evaluate((element) =>
            element.matches(':focus-visible')
          )
        ).toBe(true)
        expect(
          await row.evaluate(
            (element) =>
              getComputedStyle(element, '::after').borderTopWidth
          )
        ).toBe('1px')

        await page.keyboard.press(
          browserName === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab'
        )
        await expect(primary).toBeFocused()
        expect(
          await row.evaluate(
            (element) =>
              getComputedStyle(element, '::after').borderTopWidth
          )
        ).toBe('2px')

        await primary.evaluate((element: HTMLElement) => element.blur())
        await footer.hover()
        expect(
          await row.evaluate(
            (element) =>
              getComputedStyle(element, '::after').borderTopWidth
          )
        ).toBe('2px')
        await page.mouse.move(0, 0)
      }
    })

    for (const colorScheme of ['light', 'dark']) {
      test(
        'keeps the accordion hover outline after mouse navigation in ' +
          colorScheme,
        async ({ page }) => {
          await page.addInitScript((colorScheme) => {
            window['IS_TEST'] = true
            localStorage.setItem(
              'eufemia-theme',
              JSON.stringify({ colorScheme })
            )
          }, colorScheme)
          await page.goto(
            '/uilib/components/list/visual-tests/action-footer/'
          )
          await page.waitForFunction(() =>
            document.documentElement.hasAttribute('data-portal-ready')
          )
          const example = page.locator(
            '[data-visual-test="list-action-footer"]'
          )
          await expect(page.locator('body')).toHaveClass(
            new RegExp('eufemia-theme__color-scheme--' + colorScheme)
          )
          const accordion = example
            .locator('.dnb-list__item__accordion')
            .first()
          const header = example.getByRole('button', {
            name: 'Payments',
            exact: true,
          })
          const rows = example.locator('.dnb-list__item__action')

          for (const [index, row] of [
            rows.first(),
            rows.last(),
          ].entries()) {
            await row
              .locator(':scope > a, :scope > [role="button"]')
              .click()
            if (index === 0) {
              const drawer = page.getByRole('dialog')
              await expect(drawer).toBeVisible()
              await drawer.getByRole('button').first().click()
              await expect(drawer).toHaveCount(0)
            } else {
              await expect(page).toHaveURL(/#footer-details$/)
            }

            await header.hover()
            expect(
              await row.evaluate((element) =>
                element.matches(':focus-within')
              )
            ).toBe(true)
            expect(
              await row.evaluate(
                (element) =>
                  element.matches(':focus-visible') ||
                  !!element.querySelector(':focus-visible')
              )
            ).toBe(false)
            const color = await accordion.evaluate(
              (element) =>
                getComputedStyle(element, '::after').borderLeftColor
            )
            const rgb = color
              .match(/[0-9]+/g)
              .slice(0, 3)
              .map(Number)
            const parentBox = await accordion.boundingBox()
            const rowBox = await row.boundingBox()
            const screenshot = PNG.sync.read(await accordion.screenshot())
            const y = Math.round(
              rowBox.y - parentBox.y + rowBox.height / 2
            )
            const { width, data } = screenshot

            for (const x of [0, 1, width - 2, width - 1]) {
              const offset = (y * width + x) * 4
              expect(
                Array.from(data.subarray(offset, offset + 3))
              ).toEqual(rgb)
            }
          }
        }
      )
    }

    test('keeps the Payments header and chevron fixed when toggled', async ({
      page,
    }) => {
      await page.goto('/uilib/components/list/visual-tests/action-footer/')
      await page.waitForFunction(() =>
        document.documentElement.hasAttribute('data-portal-ready')
      )
      const example = page.locator(
        '[data-visual-test="list-action-footer"]'
      )
      const header = example.getByRole('button', {
        name: 'Payments',
        exact: true,
      })
      const measure = () =>
        header.evaluate((element) => {
          const header = element.getBoundingClientRect()
          const chevron = element
            .querySelector('.dnb-list__item__chevron')
            .getBoundingClientRect()
          return {
            height: header.height,
            chevron: chevron.top - header.top,
          }
        })
      const open = await measure()

      await header.click()
      await expect(header).toHaveAttribute('aria-expanded', 'false')
      await expect(example.locator('.dnb-list__item__action')).toHaveCount(
        0
      )
      expect(await measure()).toEqual(open)

      await header.click()
      await expect(header).toHaveAttribute('aria-expanded', 'true')
      await expect(
        example.locator('.dnb-list__item__action').first()
      ).toBeVisible()
      expect(await measure()).toEqual(open)
    })

    test('paints the full nested side and bottom hover and focus outline', async ({
      page,
    }) => {
      await page.goto('/uilib/components/list/visual-tests/action-footer/')
      await page.waitForFunction(() =>
        document.documentElement.hasAttribute('data-portal-ready')
      )
      const example = page.locator(
        '[data-visual-test="list-action-footer"]'
      )
      const rows = example.locator('.dnb-list__item__action')

      const accordion = example
        .locator('.dnb-list__item__accordion')
        .first()
      for (const [index, row] of [
        rows.first(),
        rows.last(),
        accordion,
      ].entries()) {
        for (const state of ['hover', 'focus']) {
          if (state === 'hover') {
            await row
              .locator(':scope > [role="button"], :scope > a')
              .hover()
          } else {
            await page.mouse.move(0, 0)
            await row
              .locator(':scope > [role="button"], :scope > a')
              .focus()
            await page.keyboard.press('Tab')
            await row
              .locator(':scope > [role="button"], :scope > a')
              .focus()
          }
          const color = await row.evaluate(
            (element) =>
              getComputedStyle(element, '::after').borderLeftColor
          )
          const rgb = color
            .match(/[0-9]+/g)
            .slice(0, 3)
            .map(Number)
          const screenshot = PNG.sync.read(await row.screenshot())
          const { width, height, data } = screenshot
          const points = [
            [0, Math.floor(height / 2)],
            [1, Math.floor(height / 2)],
            [width - 2, Math.floor(height / 2)],
            [width - 1, Math.floor(height / 2)],
          ]
          if (index > 0) {
            points.push(
              [Math.floor(width / 2), height - 2],
              [Math.floor(width / 2), height - 1]
            )
          }

          for (const [x, y] of points) {
            const offset = (y * width + x) * 4
            expect(Array.from(data.subarray(offset, offset + 3))).toEqual(
              rgb
            )
          }
        }
      }
    })

    test('keeps disabled footer content available to screen readers', async ({
      page,
    }) => {
      await page.goto('/uilib/components/list/visual-tests/action-footer/')
      await page.waitForFunction(() =>
        document.documentElement.hasAttribute('data-portal-ready')
      )

      for (const state of ['disabled', 'inherited-disabled']) {
        const item = page.getByTestId(state)
        const footerButton = item.locator('button')
        await expect(footerButton).toBeVisible()
        await footerButton.evaluate((element: HTMLElement) =>
          element.focus()
        )
        await expect(footerButton).not.toBeFocused()
        await expect(footerButton).toBeDisabled()
        await expect(
          item.getByRole('button', { name: 'Unavailable action' })
        ).toHaveCount(1)
        const snapshot = await item.ariaSnapshot()
        expect(snapshot).toContain('Footer details')
        expect(snapshot).toContain('Unavailable action')
        expect(snapshot).toContain('Footer help')
        await expect(item.locator('a')).not.toHaveAttribute('href')
        await expect(item.locator('[role="button"]')).toHaveAttribute(
          'tabindex',
          '-1'
        )
      }
    })

    test('preserves focus and footer interaction while the item is pending', async ({
      page,
      browserName,
    }) => {
      await page.goto('/uilib/components/list/visual-tests/action-footer/')
      await page.waitForFunction(() =>
        document.documentElement.hasAttribute('data-portal-ready')
      )

      const item = page.getByTestId('pending-footer')
      const save = item.getByRole('button', { name: 'Save', exact: true })
      const finish = item.getByRole('button', { name: 'Finish saving' })

      await save.focus()
      await page.keyboard.press('Enter')
      await expect(item.locator('.dnb-list__item')).toHaveClass(
        /dnb-list__item--pending/
      )
      await expect(save).toBeFocused()
      await expect(save).toBeEnabled()
      expect(await item.ariaSnapshot()).toContain('Finish saving')

      await page.keyboard.press(
        browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
      )
      await expect(finish).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(item.locator('.dnb-list__item')).not.toHaveClass(
        /dnb-list__item--pending/
      )
      await expect(finish).toBeFocused()

      await save.click()
      await expect(item.locator('.dnb-list__item')).toHaveClass(
        /dnb-list__item--pending/
      )
      await finish.click()
      await expect(item.locator('.dnb-list__item')).not.toHaveClass(
        /dnb-list__item--pending/
      )
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
    await page.waitForFunction(() =>
      document.documentElement.hasAttribute('data-portal-ready')
    )
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
          // Like in the design, the first line of the end cell is placed
          // on the title line, also when more lines follow
          const firstLineMiddle = (element: Element) => {
            const range = document.createRange()
            range.selectNodeContents(element)
            return middle(range.getClientRects()[0])
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
              firstLineMiddle(item.querySelector('.dnb-list__item__end')) -
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
