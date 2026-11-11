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
  await expect(scrollView).not.toHaveCSS('box-shadow', 'none')

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
    const indicator = scrollView.locator('.dnb-table__scroll-indicator')

    await expect(indicator).toBeVisible()
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

  test('reveals more columns in property tables', async ({ page }) => {
    await page.goto('/web/components/table/properties/')
    const scrollView = page.locator('.dnb-table__scroll-view').first()
    const button = scrollView.locator('.dnb-table__scroll-indicator')

    await expect(button).toBeVisible()
    await button.click()
    await expect
      .poll(() => scrollView.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0)
    await expect(button).toBeHidden()
    await expect(scrollView).toBeFocused()
  })

  test('moves the button with the table while fading as keyboard scrolling starts', async ({
    page,
  }) => {
    const scrollView = await focusScrollViewWithKeyboard(
      page,
      'table-horizontal-scroll'
    )
    const indicator = scrollView.locator('.dnb-table__scroll-indicator')

    for (const direction of ['ltr', 'rtl']) {
      await test.step(direction, async () => {
        await scrollView.evaluate((element: HTMLElement, direction) => {
          element.dir = direction
          element.scrollLeft = 0
          element.dispatchEvent(new Event('scroll'))
        }, direction)
        await expect(indicator).toBeVisible()
        await expect(indicator).toHaveCSS('opacity', '1')
        const initial = await indicator.boundingBox()
        const table = await scrollView.locator('table').boundingBox()
        const offset = initial.x - table.x

        await scrollView.press(
          direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft'
        )
        await expect
          .poll(() =>
            scrollView.evaluate((element) => Math.abs(element.scrollLeft))
          )
          .toBeGreaterThan(0)
        await expect
          .poll(() =>
            indicator.evaluate((element) =>
              Number(getComputedStyle(element).opacity)
            )
          )
          .toBeLessThan(1)
        await expect
          .poll(async () =>
            Math.abs((await indicator.boundingBox()).x - initial.x)
          )
          .toBeGreaterThan(1)
        await expect
          .poll(() =>
            scrollView.evaluate((element, offset) => {
              const button = element.querySelector(
                '.dnb-table__scroll-indicator'
              )
              const table = element.querySelector('table')
              return Math.abs(
                button.getBoundingClientRect().x -
                  table.getBoundingClientRect().x -
                  offset
              )
            }, offset)
          )
          .toBeLessThan(1)
        await expect(scrollView).toBeFocused()
        await expect(scrollView).not.toHaveCSS('box-shadow', 'none')

        await scrollView.evaluate((element, direction) => {
          element.scrollLeft =
            direction === 'ltr'
              ? element.scrollWidth
              : -element.scrollWidth
        }, direction)
        await expect(indicator).toBeHidden()
      })
    }

    await test.step('tables without horizontal overflow have no button', async () => {
      await scrollView
        .locator('table')
        .evaluate((element: HTMLElement) => {
          element.style.minWidth = '0'
          element.style.width = '100%'
          element.style.tableLayout = 'fixed'
        })
      await expect(indicator).toBeHidden()
    })
  })

  test('nudges the arrow twice only on first appearance and uses a tooltip', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    const scrollView = page.locator(
      '[data-visual-test="table-horizontal-scroll"] .dnb-table__scroll-view'
    )
    const button = scrollView.locator('.dnb-table__scroll-indicator')
    const icon = button.locator('.dnb-icon svg')

    await button.scrollIntoViewIfNeeded()
    await expect(icon).toHaveCSS('animation-name', 'table-scroll-nudge')
    await expect(icon).toHaveCSS('animation-iteration-count', '1')
    await icon.evaluate((element) => {
      element.getAnimations()[0].pause()
    })

    for (const [direction, sign] of [
      ['ltr', 1],
      ['rtl', -1],
    ] as const) {
      await test.step(`centers and slows the nudge in ${direction}`, async () => {
        await scrollView.evaluate((element: HTMLElement, direction) => {
          element.dir = direction
          element.dispatchEvent(new Event('scroll'))
        }, direction)
        await expect(button.locator('.dnb-icon')).toHaveCSS(
          'transform',
          direction === 'rtl' ? 'matrix(-1, 0, 0, -1, 0, 0)' : 'none'
        )
        const motion = await icon.evaluate((element) => {
          const animation = element.getAnimations()[0]
          animation.currentTime = 0
          const start = element.getBoundingClientRect().x
          animation.currentTime = 140
          const forward = element.getBoundingClientRect().x - start
          animation.currentTime = 350
          const backward = element.getBoundingClientRect().x - start
          animation.currentTime = 630
          const secondForward = element.getBoundingClientRect().x - start
          animation.currentTime = 1050
          const secondBackward = element.getBoundingClientRect().x - start
          return { forward, backward, secondForward, secondBackward }
        })
        expect(sign * motion.forward).toBeCloseTo(2)
        expect(sign * motion.backward).toBeCloseTo(-2)
        expect(sign * motion.secondForward).toBeCloseTo(1)
        expect(sign * motion.secondBackward).toBeCloseTo(-1)
      })
    }
    await icon.evaluate((element) => {
      element.getAnimations()[0].finish()
    })
    await expect(icon).toHaveCSS('transform', 'none')

    await expect(button).toHaveAccessibleName('Se flere kolonner')
    await expect(button).not.toHaveAttribute('title')
    await button.hover()
    await expect(page.getByRole('tooltip')).toHaveText('Se flere kolonner')
    await page.mouse.move(0, 0)
    await button.focus()
    await expect(page.getByRole('tooltip')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('tooltip')).toBeHidden()

    for (const direction of ['ltr', 'rtl']) {
      await test.step(direction, async () => {
        await scrollView.evaluate((element) => {
          element.scrollTo({
            left:
              getComputedStyle(element).direction === 'rtl'
                ? -element.scrollWidth
                : element.scrollWidth,
            behavior: 'instant',
          })
        })
        await expect(button).toBeHidden()
        await scrollView.evaluate((element: HTMLElement, direction) => {
          element.dir = direction
          element.scrollTo({ left: 0, behavior: 'instant' })
          element.dispatchEvent(new Event('scroll'))
        }, direction)
        await expect(button).toBeVisible()
        const animations = await icon.evaluate(async (element) => {
          await new Promise(requestAnimationFrame)
          await new Promise(requestAnimationFrame)
          return element.getAnimations().length
        })
        expect(animations).toBe(0)
      })
    }

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(icon).toHaveCSS('animation-name', 'none')
  })

  test('the button reveals more columns and retains native keyboard scrolling', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const scrollView = page.locator(
      '[data-visual-test="table-horizontal-scroll"] .dnb-table__scroll-view'
    )
    const button = scrollView.locator('.dnb-table__scroll-indicator')

    await button.click()
    await expect
      .poll(() => scrollView.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0)
    await expect(button).toBeHidden()
    await expect(scrollView).toBeFocused()

    const position = await scrollView.evaluate(
      (element) => element.scrollLeft
    )
    await scrollView.press('ArrowLeft')
    await expect
      .poll(() => scrollView.evaluate((element) => element.scrollLeft))
      .toBeLessThan(position)

    await scrollView.evaluate((element) => {
      element.scrollLeft = 0
    })
    await expect(button).toBeVisible()
    await expect(button).toHaveCSS('opacity', '1')

    await scrollView.press('Tab')
    await expect(button).toBeFocused()
    await button.press('Enter')
    await expect(button).toBeHidden()
    await expect(scrollView).toBeFocused()
  })

  test('dismisses the tooltip on activation before the table moves', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    const scrollView = page.locator(
      '[data-visual-test="table-horizontal-scroll"] .dnb-table__scroll-view'
    )
    const button = scrollView.locator('.dnb-table__scroll-indicator')
    const tooltip = page.getByRole('tooltip')

    for (const [activation, activate] of [
      ['click', () => button.click()],
      ['Enter', () => button.press('Enter')],
    ] as const) {
      await test.step(activation, async () => {
        await button.hover()
        await expect(tooltip).toBeVisible()

        await button.evaluate((element) => {
          element.removeAttribute('data-tooltip-visible-after-click')
          element.addEventListener(
            'click',
            () => {
              requestAnimationFrame(() => {
                const tooltip = document.querySelector('[role="tooltip"]')
                element.setAttribute(
                  'data-tooltip-visible-after-click',
                  String(
                    Boolean(tooltip && tooltip.getClientRects().length)
                  )
                )
              })
            },
            { once: true }
          )
        })

        await activate()
        await expect(button).toHaveAttribute(
          'data-tooltip-visible-after-click',
          'false'
        )
        await expect
          .poll(() => scrollView.evaluate((element) => element.scrollLeft))
          .toBeGreaterThan(0)

        await page.mouse.move(0, 0)
        await scrollView.evaluate((element) => {
          element.scrollTo({ left: 0, behavior: 'instant' })
        })
        await expect(button).toBeVisible()
      })
    }
  })
})
