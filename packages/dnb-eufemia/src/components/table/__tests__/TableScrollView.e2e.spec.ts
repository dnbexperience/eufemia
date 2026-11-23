import { test, expect, type Page } from '@playwright/test'
import { contrastRatio } from '../../../../scripts/figma/tokenReview'

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

test.describe('Table.ScrollView', () => {
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

  test('removes overflow when the Basic table has enough space', async ({
    page,
  }) => {
    const scrollView = page.locator(
      '[data-visual-test="table-default"] .dnb-table__scroll-view'
    )
    const indicator = page.locator(
      '[data-visual-test="table-default"] .dnb-table__scroll-indicator'
    )

    await expect(indicator).toBeVisible()
    await indicator.locator('button').first().focus()
    await page.setViewportSize({ width: 550, height: 1024 })
    await expect(indicator.locator('button').first()).toBeHidden()
    await expect(indicator).toBeVisible()
    expect(
      await scrollView.evaluate(
        (element) => element.scrollWidth - element.clientWidth
      )
    ).toBeGreaterThan(1)
    await expect(scrollView).toBeFocused()
    await scrollView.evaluate((element) => {
      element.scrollLeft = element.scrollWidth
    })

    for (const width of [1280, 1600]) {
      await test.step(`viewport width ${width}`, async () => {
        await page.setViewportSize({ width, height: 1024 })
        await expect
          .poll(() =>
            scrollView.evaluate(
              (element) => element.scrollWidth - element.clientWidth
            )
          )
          .toBeLessThanOrEqual(1)
        await expect(indicator).toBeHidden()
        await expect(indicator).toHaveCount(0)
        await expect(scrollView).not.toHaveAttribute('tabindex')

        const sortButton = scrollView
          .locator('.dnb-table__sort-button')
          .last()
        await sortButton.focus()
        await expect(sortButton).toBeFocused()
        expect(
          await scrollView.evaluate(
            (element) => element.scrollWidth - element.clientWidth
          )
        ).toBeLessThanOrEqual(1)
      })
    }
  })

  test('keeps the table in place and retains indicator focus during keyboard scrolling', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.setViewportSize({ width: 500, height: 900 })
    const container = page.locator(
      '[data-visual-test="table-default"] .dnb-table__scroll-container'
    )
    const scrollView = container.locator('.dnb-table__scroll-view')
    const indicator = container
      .locator('.dnb-scroll-indicator__item')
      .last()
    await indicator.focus()
    const [movement] = await Promise.all([
      scrollView.evaluate(
        (element) =>
          new Promise<number>((resolve) => {
            const start = element.getBoundingClientRect().y
            let movement = 0
            // Catch temporary layout jumps during smooth scrolling too.
            const measure = () => {
              movement = Math.max(
                movement,
                Math.abs(element.getBoundingClientRect().y - start)
              )
              if (
                element.scrollLeft >=
                element.scrollWidth - element.clientWidth - 1
              ) {
                resolve(movement)
              } else {
                requestAnimationFrame(measure)
              }
            }
            measure()
          })
      ),
      indicator.press('Enter'),
    ])

    expect(movement).toBeLessThan(1)
    await expect(indicator).toBeVisible()
    await expect(indicator).toBeFocused()
  })

  test('reveals more columns in property tables', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/table/properties/')
    const container = page.locator('.dnb-table__scroll-container').first()
    const scrollView = container.locator('.dnb-table__scroll-view')
    const indicators = container.locator('.dnb-scroll-indicator__item')

    await expect(indicators.last()).toBeVisible()
    await indicators.last().click()
    await expect
      .poll(() => scrollView.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0)
    await expect(indicators.last()).toHaveAttribute('data-active', 'true')
  })

  test('inactive column indicators have at least 3:1 contrast in light and dark mode', async ({
    page,
  }) => {
    for (const colorScheme of ['light', 'dark']) {
      await test.step(colorScheme, async () => {
        await page.evaluate((colorScheme) => {
          localStorage.setItem(
            'eufemia-theme',
            JSON.stringify({ brand: 'ui', colorScheme })
          )
        }, colorScheme)
        await page.reload()
        await expect(page.locator('body')).toHaveClass(
          new RegExp(`eufemia-theme__color-scheme--${colorScheme}`)
        )
        const indicator = page
          .locator(
            '[data-visual-test="table-horizontal-scroll"] .dnb-scroll-indicator__item[data-active="false"]'
          )
          .first()
        await expect(indicator).toBeVisible()
        const { foreground, background } = await indicator.evaluate(
          (element) => {
            let surface = element.parentElement
            while (
              getComputedStyle(surface).backgroundColor ===
              'rgba(0, 0, 0, 0)'
            ) {
              surface = surface.parentElement
            }
            return {
              foreground: getComputedStyle(
                element.querySelector('span'),
                '::before'
              ).borderTopColor,
              background: getComputedStyle(surface).backgroundColor,
            }
          }
        )
        expect(
          contrastRatio(foreground, background, background)
        ).toBeGreaterThanOrEqual(3)
      })
    }
  })

  test('column indicators have generous targets and support keyboard activation in both directions', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const container = page.locator(
      '[data-visual-test="table-horizontal-scroll"] .dnb-table__scroll-container'
    )
    const scrollView = container.locator('.dnb-table__scroll-view')
    const indicators = container.locator('.dnb-scroll-indicator__item')
    await expect(indicators).toHaveCount(5)

    for (const [direction, nextKey] of [
      ['ltr', 'ArrowRight'],
      ['rtl', 'ArrowLeft'],
    ]) {
      await test.step(direction, async () => {
        await container.evaluate((element, direction) => {
          element.setAttribute('dir', direction)
          const scrollView = element.querySelector(
            '.dnb-table__scroll-view'
          )
          scrollView.scrollLeft = 0
          scrollView.dispatchEvent(new Event('scroll'))
        }, direction)
        await expect(indicators.first()).toHaveAttribute(
          'data-active',
          'true'
        )
        await expect(indicators.last()).toHaveAttribute(
          'data-active',
          'false'
        )
        const box = await indicators.last().boundingBox()
        expect(box.width).toBeCloseTo(24)
        expect(box.height).toBeCloseTo(32)
        expect(box.y + box.height).toBeCloseTo(
          (await scrollView.boundingBox()).y
        )
        const previousBox = await indicators.nth(3).boundingBox()
        expect(Math.abs(box.x - previousBox.x)).toBeCloseTo(box.width)
        // Activate near the target's edge, away from the visible dot.
        await indicators.last().click({ position: { x: 2, y: 2 } })
        await expect(indicators.last()).toHaveAttribute(
          'data-active',
          'true'
        )
        await expect(indicators.first()).toHaveAttribute(
          'data-active',
          'false'
        )
        await expect(indicators.first()).toHaveAccessibleName(
          /(?:Show|Vis) (?:column|kolonne) 1/
        )
        await expect(container.getByRole('toolbar')).toHaveAccessibleName(
          /Table columns|Tabellkolonner/
        )
        await expect(
          container.locator('.dnb-scroll-indicator__item[tabindex="0"]')
        ).toHaveCount(1)
        await indicators.first().focus()
        const initialScroll = await scrollView.evaluate(
          (element) => element.scrollLeft
        )
        await page.keyboard.press(nextKey)
        await expect(indicators.nth(1)).toBeFocused()
        await page.keyboard.press('Home')
        await expect(indicators.first()).toBeFocused()
        expect(
          await scrollView.evaluate((element) => element.scrollLeft)
        ).toBe(initialScroll)
        await indicators.first().press('Enter')
        await expect
          .poll(() =>
            scrollView.evaluate((element) => Math.abs(element.scrollLeft))
          )
          .toBeLessThan(1)
        await expect(indicators.first()).toBeFocused()
        await page.keyboard.press('Tab')
        await expect(scrollView).toBeFocused()
        await page.keyboard.press('Shift+Tab')
        await expect(indicators.first()).toBeFocused()
        await page.keyboard.press(nextKey)
        await expect(indicators.nth(1)).toBeFocused()
        await indicators.nth(1).press('Space')
        await expect
          .poll(() =>
            scrollView.evaluate((element) => Math.abs(element.scrollLeft))
          )
          .toBeGreaterThan(0)
        await expect(indicators.nth(1)).toBeFocused()
        await page.keyboard.press('Tab')
        await expect(scrollView).toBeFocused()
        await page.keyboard.press('Shift+Tab')
        await expect(indicators.nth(1)).toBeFocused()
        await page.keyboard.press('Home')
        await indicators.first().press('Enter')
        await scrollView.focus()
        await scrollView.press(nextKey)
        await expect
          .poll(() =>
            scrollView.evaluate((element) => Math.abs(element.scrollLeft))
          )
          .toBeGreaterThan(0)
      })
    }

    await page.emulateMedia({ forcedColors: 'active' })
    await indicators.first().focus()
    await expect(indicators.first().locator('span')).toHaveCSS(
      'outline-style',
      'solid'
    )
  })

  test('keeps indicators outside a vertically scrolling table', async ({
    page,
  }) => {
    const container = page.locator(
      '[data-visual-test="table-sticky"] .dnb-table__scroll-container'
    )
    const scrollView = container.locator('.dnb-table__scroll-view')
    const indicator = container
      .locator('.dnb-scroll-indicator__item')
      .first()
    await indicator.scrollIntoViewIfNeeded()
    const before = await indicator.boundingBox()
    await scrollView.evaluate((element) => {
      element.scrollTop = 160
    })
    await expect
      .poll(async () => (await indicator.boundingBox()).y)
      .toBe(before.y)
    await indicator.click({ trial: true })
  })

  test('keeps column indicators inside Table.Container without changing its inner spacing', async ({
    page,
  }) => {
    for (const example of ['table-container', 'table-container-empty']) {
      await test.step(example, async () => {
        const container = page.locator(
          `[data-visual-test="${example}"] .dnb-table__container`
        )
        const indicator = page
          .locator(
            `[data-visual-test="${example}"] .dnb-table__scroll-indicator`
          )
          .first()
        await expect(indicator).toBeVisible()
        const indicatorBox = await indicator.boundingBox()
        const containerBox = await container.boundingBox()
        await expect(
          container.locator('.dnb-table__scroll-indicator')
        ).toHaveCount(1)
        expect(indicatorBox.y).toBeGreaterThanOrEqual(containerBox.y)
        expect(indicatorBox.x + indicatorBox.width).toBeLessThanOrEqual(
          containerBox.x + containerBox.width
        )

        const head = container.locator('.dnb-table__container__head')
        const headBox = await head.boundingBox()
        expect(headBox.y).toBeCloseTo(containerBox.y, 0)
        const dotBox = await indicator
          .locator('span')
          .first()
          .boundingBox()
        const contentBox = await container
          .locator(
            example === 'table-container'
              ? '.dnb-table__container__head h2'
              : 'th'
          )
          .first()
          .evaluate((element) => {
            const range = document.createRange()
            range.selectNodeContents(element)
            return range.getBoundingClientRect().toJSON()
          })
        expect(dotBox.y + dotBox.height).toBeLessThanOrEqual(contentBox.y)
        const padding = await head.evaluate((element) => {
          const style = getComputedStyle(element)
          return [style.paddingTop, style.paddingInlineStart]
        })
        expect(padding).toEqual(
          example === 'table-container' ? ['32px', '16px'] : ['0px', '0px']
        )

        const scrollView = container.locator('.dnb-table__scroll-view')
        await indicator.locator('button').last().click()
        await expect
          .poll(() => scrollView.evaluate((element) => element.scrollLeft))
          .toBeGreaterThan(0)
        const afterScroll = await indicator.boundingBox()
        expect(afterScroll.x).toBeCloseTo(indicatorBox.x, 0)
      })
    }
  })

  test('retains focus when overflow disappears and returns while the indicator is focused', async ({
    page,
  }) => {
    const container = page.locator(
      '[data-visual-test="table-default"] .dnb-table__scroll-container'
    )
    const scrollView = container.locator('.dnb-table__scroll-view')
    const button = container.locator('.dnb-scroll-indicator__item').first()
    const table = scrollView.locator('table')
    await button.focus()
    await page.setViewportSize({ width: 1600, height: 1024 })
    await expect(button).toBeHidden()
    await expect(scrollView).not.toHaveAttribute('tabindex')
    await expect(table).toBeFocused()
    await page.setViewportSize({ width: 375, height: 1024 })
    await expect(button).toBeVisible()
    await expect(scrollView).toHaveAttribute('tabindex', '0')
    await expect(table).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(scrollView.locator('table button').first()).toBeFocused()
  })
})
