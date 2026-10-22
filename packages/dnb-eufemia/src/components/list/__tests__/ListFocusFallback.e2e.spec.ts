import { test, expect, type Locator, type Page } from '@playwright/test'

// Safari before 15.4 and Firefox before 121 do not support :has(). This
// simulates them: it removes every rule that uses :has() and applies the
// rules inside `@supports not (selector(:has(*)))`.
function simulateNoHasSupport(page: Page) {
  return page.evaluate(() => {
    let removed = 0
    let fallbacks = 0

    const walk = (list: CSSStyleSheet | CSSGroupingRule) => {
      for (let i = list.cssRules.length - 1; i >= 0; i--) {
        const rule = list.cssRules[i]

        if (
          rule instanceof CSSStyleRule &&
          rule.selectorText.includes(':has(')
        ) {
          list.deleteRule(i)
          removed++
        } else if (
          rule instanceof CSSSupportsRule &&
          rule.conditionText.replace(/\s/g, '') ===
            'not(selector(:has(*)))'
        ) {
          const inner = [...rule.cssRules].map(({ cssText }) => cssText)
          list.deleteRule(i)
          inner.reverse().forEach((text) => list.insertRule(text, i))
          fallbacks += inner.length
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

    return { removed, fallbacks }
  })
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

test.describe('List focus outline without :has() support', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/list/visual-tests/focus-fallback/')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )

    const { removed, fallbacks } = await simulateNoHasSupport(page)
    expect(removed).toBeGreaterThan(0)
    expect(fallbacks).toBeGreaterThan(0)
  })

  // The last match is the innermost item, because a parent accordion
  // also contains the titles of its nested items
  const row = (page: Page, title: string) =>
    page
      .locator('[data-testid="focus-fallback"] .dnb-list__item')
      .filter({ has: page.getByText(title, { exact: true }) })
      .last()
  const parentAccordion = (page: Page) => row(page, 'Parent accordion')
  const primaryTarget = (item: Locator) =>
    item.locator(
      '> .dnb-list__item__action__button, > a, > .dnb-list__item__accordion__header'
    )

  test('should show the outline on a focused action row', async ({
    page,
  }) => {
    const item = row(page, 'Action row')
    await focusWithKeyboard(page, primaryTarget(item))

    expect(await hasOutline(item)).toBe(true)
  })

  test('should show the outline on a focused link row', async ({
    page,
  }) => {
    const item = row(page, 'Link row')
    await focusWithKeyboard(page, primaryTarget(item))

    expect(await hasOutline(item)).toBe(true)
  })

  test('should show the outline on a focused accordion header', async ({
    page,
  }) => {
    const item = parentAccordion(page)
    await focusWithKeyboard(page, primaryTarget(item))

    expect(await hasOutline(item)).toBe(true)
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
    const parent = parentAccordion(page)
    const nestedRow = row(page, 'Nested action row')
    const nestedAccordion = row(page, 'Nested accordion')

    await focusWithKeyboard(page, primaryTarget(nestedRow))
    expect(await hasOutline(nestedRow)).toBe(true)
    expect(await hasOutline(parent)).toBe(false)

    await focusWithKeyboard(page, primaryTarget(nestedAccordion))
    expect(await hasOutline(nestedAccordion)).toBe(true)
    expect(await hasOutline(parent)).toBe(false)
  })
})
