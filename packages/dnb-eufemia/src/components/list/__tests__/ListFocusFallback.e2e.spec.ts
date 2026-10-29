import { test, expect, type Locator, type Page } from '@playwright/test'

type Browser = 'firefox-before-121' | 'safari-before-15.4'

// Simulates an older browser: removes every rule that uses a selector it
// does not support, and applies the `@supports` rules as it would.
function simulate(page: Page, browser: Browser) {
  return page.evaluate((browser) => {
    const unsupported =
      browser === 'safari-before-15.4'
        ? [':has(', ':focus-visible']
        : [':has(']
    const supportsSelector = (selector: string) =>
      !unsupported.some((pseudo) => selector.startsWith(pseudo))

    // Only handles the conditions these styles use
    const evaluate = (condition: string) => {
      const js = condition
        .replaceAll('selector(:has(*))', String(supportsSelector(':has(')))
        .replaceAll(
          'selector(:focus-visible)',
          String(supportsSelector(':focus-visible'))
        )
        .replace(/\bnot\b/g, '!')
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')

      if (!/^[\s!&|()a-z]*$/.test(js)) {
        return null // Not a selector condition
      }

      return Boolean(new Function(`return ${js}`)())
    }

    let removed = 0
    let applied = 0

    const walk = (list: CSSStyleSheet | CSSGroupingRule) => {
      for (let i = list.cssRules.length - 1; i >= 0; i--) {
        const rule = list.cssRules[i]

        if (
          rule instanceof CSSStyleRule &&
          unsupported.some((pseudo) => rule.selectorText.includes(pseudo))
        ) {
          list.deleteRule(i)
          removed++
        } else if (rule instanceof CSSSupportsRule) {
          const result = evaluate(rule.conditionText)

          if (result === true) {
            const inner = [...rule.cssRules].map(({ cssText }) => cssText)
            list.deleteRule(i)
            inner.reverse().forEach((text) => list.insertRule(text, i))
            applied += inner.length
          } else if (result === false) {
            list.deleteRule(i)
          }
        } else if ('cssRules' in rule) {
          walk(rule as CSSGroupingRule)
        }
      }
    }

    for (const sheet of document.styleSheets) {
      try {
        walk(sheet)
      } catch {
        // Skip style sheets from other origins
      }
    }

    return { removed, applied }
  }, browser)
}

// Returns true when the item shows the navigation outline, either on the
// item itself or on its primary target (action button, link or header)
function hasOutline(item: Locator) {
  return item.evaluate((element) => {
    const probe = document.createElement('span')
    probe.style.color = 'var(--list-item-navigation-outline-color)'
    element.appendChild(probe)
    const color = getComputedStyle(probe).color
    probe.remove()

    const frame = getComputedStyle(element, '::after')
    const onItem =
      frame.borderTopColor === color &&
      parseFloat(frame.borderTopWidth) > 1

    const target = element.querySelector(
      ':scope > .dnb-list__item__action__button, :scope > a, :scope > .dnb-list__item__accordion__header'
    )
    const onTarget =
      target !== null &&
      getComputedStyle(target, '::before').boxShadow.includes(color)

    return onItem || onTarget
  })
}

async function focusWithKeyboard(page: Page, target: Locator) {
  await page.keyboard.press('a')
  await target.focus()
  await expect(target).toBeFocused()
}

// The last match is the innermost item, because a parent accordion also
// contains the titles of its nested items
const row = (page: Page, title: string) =>
  page
    .locator('[data-testid="focus-fallback"] .dnb-list__item')
    .filter({ has: page.getByText(title, { exact: true }) })
    .last()
const primaryTarget = (item: Locator) =>
  item.locator(
    '> .dnb-list__item__action__button, > a, > .dnb-list__item__accordion__header'
  )

async function openPage(page: Page) {
  await page.goto('/uilib/components/list/visual-tests/focus-fallback/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
}

for (const browser of [
  'firefox-before-121',
  'safari-before-15.4',
] as const) {
  test.describe(`List focus outline in ${browser}`, () => {
    test.beforeEach(async ({ page }) => {
      await openPage(page)

      const { removed, applied } = await simulate(page, browser)
      expect(removed).toBeGreaterThan(0)
      expect(applied).toBeGreaterThan(0)
    })

    for (const title of ['Action row', 'Link row', 'Parent accordion']) {
      test(`should show the outline on keyboard focus of "${title}"`, async ({
        page,
      }) => {
        const item = row(page, title)
        await focusWithKeyboard(page, primaryTarget(item))

        expect(await hasOutline(item)).toBe(true)
      })
    }

    test('should not show a bottom border on the last row in a Card', async ({
      page,
    }) => {
      const lastRow = page
        .locator('[data-testid="focus-fallback"] .dnb-list__container')
        .first()
        .locator('> .dnb-list__item')
        .last()

      expect(
        await lastRow.evaluate(
          (element) =>
            getComputedStyle(element, '::after').borderBottomWidth
        )
      ).toBe('0px')
    })

    test('should not show the row outline when a footer control has focus', async ({
      page,
    }) => {
      const item = row(page, 'Footer row')
      await focusWithKeyboard(
        page,
        item.getByRole('button', { name: 'Footer action' })
      )

      expect(await hasOutline(item)).toBe(false)
    })

    test('should not show the parent outline when a nested item has focus', async ({
      page,
    }) => {
      const parent = row(page, 'Parent accordion')
      const nestedRow = row(page, 'Nested action row')
      const nestedAccordion = row(page, 'Nested accordion')

      await focusWithKeyboard(page, primaryTarget(nestedRow))
      expect(await hasOutline(nestedRow)).toBe(true)
      expect(await hasOutline(parent)).toBe(false)

      await focusWithKeyboard(page, primaryTarget(nestedAccordion))
      expect(await hasOutline(nestedAccordion)).toBe(true)
      expect(await hasOutline(parent)).toBe(false)
    })

    if (browser === 'firefox-before-121') {
      test('should not show the outline after a mouse click', async ({
        page,
      }) => {
        const item = row(page, 'Action row')
        await primaryTarget(item).click()
        await page.mouse.move(0, 0)
        await expect(primaryTarget(item)).toBeFocused()

        expect(await hasOutline(item)).toBe(false)
      })
    }
  })
}
