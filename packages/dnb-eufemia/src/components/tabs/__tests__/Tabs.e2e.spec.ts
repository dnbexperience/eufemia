import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

async function expectAlignedSelection(tablist: Locator) {
  await tablist.evaluate(async (element) => {
    await Promise.all(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished.catch(() => {}))
    )
  })
  await expect
    .poll(() =>
      tablist.evaluate((element) => {
        const selected = element
          .querySelector('[aria-selected="true"]')
          .getBoundingClientRect()
        const selection = element
          .querySelector('.dnb-tabs__selection')
          .getBoundingClientRect()
        return Math.max(
          Math.abs(selected.left - selection.left),
          Math.abs(selected.right - selection.right)
        )
      })
    )
    .toBeLessThan(1)
}

for (const width of [480, 1440]) {
  test(`keeps the selection aligned during keyboard navigation at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 })
    await page.goto(
      '/web/components/tabs/demos/#tabs-optimized-for-narrow-screens',
      { waitUntil: 'domcontentloaded' }
    )
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
    const example = page.locator(
      '[data-visual-test="tabs-tablist-scrollable"]'
    )
    const tablist = example.getByRole('tablist')
    const first = tablist.getByRole('tab', { name: 'First', exact: true })
    const second = tablist.getByRole('tab', {
      name: 'Second',
      exact: true,
    })
    const last = tablist.getByRole('tab', { name: 'Tenth', exact: true })

    await expectAlignedSelection(tablist)

    await test.step('focus the first tab without changing selection', async () => {
      await second.press('Home')
      await expect(first).toBeFocused()
      await expect(second).toHaveAttribute('aria-selected', 'true')
      await expectAlignedSelection(tablist)
    })

    await test.step('remove the space for the first focus ring', async () => {
      await first.press('ArrowRight')
      await expect(second).toBeFocused()
      await expectAlignedSelection(tablist)
    })

    await test.step('scroll to and select the last tab', async () => {
      await second.press('End')
      await expect(last).toBeFocused()
      await expectAlignedSelection(tablist)
      await last.press('Space')
      await expect(last).toHaveAttribute('aria-selected', 'true')
      await expectAlignedSelection(tablist)
      await expect
        .poll(() => tablist.evaluate((element) => element.scrollLeft))
        .toBeGreaterThan(0)
    })

    await test.step('scroll back and select the first tab', async () => {
      await last.press('Home')
      await expect(first).toBeFocused()
      await first.press('Space')
      await expect(first).toHaveAttribute('aria-selected', 'true')
      await expectAlignedSelection(tablist)
      await expect
        .poll(() => tablist.evaluate((element) => element.scrollLeft))
        .toBeLessThan(1)
      await first.press('Enter')
      await expect(example.getByRole('tabpanel')).toBeFocused()
      await expectAlignedSelection(tablist)
      await first.press('ArrowRight')
      await expect(second).toBeFocused()
      await expect(first).toHaveAttribute('aria-selected', 'true')
      await expectAlignedSelection(tablist)
    })
  })
}

// Touch browsers keep :hover on the last tapped element. The hover styles
// must not come back when the user presses a key after a tap.
async function readTouchStyles(element: Locator) {
  return element.evaluate(async (node) => {
    await Promise.all(
      node
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished.catch(() => {}))
    )
    const style = getComputedStyle(node)
    const after = getComputedStyle(node, '::after')
    const before = getComputedStyle(node, '::before')
    const text = node.querySelector(
      '.dnb-button__text, .dnb-tabs__button__title'
    )

    return {
      color: style.color,
      background: style.backgroundColor,
      border: style.boxShadow,
      after: after.backgroundColor + ' ' + after.opacity,
      outline: `${before.outlineStyle} ${before.outlineWidth} ${before.outlineColor}`,
      text: text
        ? `${getComputedStyle(text).color} ${getComputedStyle(text).textDecorationColor}`
        : null,
    }
  })
}

async function expectNoHoverStyleAfterTapAndKeyPress(
  page: Page,
  element: Locator
) {
  await element.tap()
  await element.blur()
  await page.keyboard.press('a')
  await expect(page.locator('html')).toHaveAttribute(
    'data-whatintent',
    'keyboard'
  )
  expect(await element.evaluate((node) => node.matches(':hover'))).toBe(
    true
  )
  const tapped = await readTouchStyles(element)

  // Move the hover away to get the same state without hover
  await page.mouse.move(0, 0)
  expect(await element.evaluate((node) => node.matches(':hover'))).toBe(
    false
  )
  expect(tapped).toEqual(await readTouchStyles(element))
}

test.describe('Tabs on touch devices', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/tabs/demos/?data-visual-test')
  })

  test('does not show the hover style after a tap and a key press', async ({
    page,
  }) => {
    await expectNoHoverStyleAfterTapAndKeyPress(
      page,
      page
        .locator(
          '[data-visual-test="tabs-clickhandler"] .dnb-tabs__button'
        )
        .nth(1)
    )
  })

  test('shows the keyboard focus outline on a tapped tab', async ({
    page,
  }) => {
    const tab = page
      .locator('[data-visual-test="tabs-clickhandler"] .dnb-tabs__button')
      .nth(1)

    await tab.tap()
    await expect(tab).toHaveAttribute('aria-selected', 'true')

    // Come back with the keyboard. The tapped tab keeps :hover.
    // Tab focuses the tab list, and the arrow keys move between the tabs.
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowLeft')
    await expect(tab).toBeFocused()
    expect(await tab.evaluate((node) => node.matches(':hover'))).toBe(true)
    const tapped = await readTouchStyles(tab)

    // Move the hover away to get the same state without hover
    await page.mouse.move(0, 0)
    expect(await tab.evaluate((node) => node.matches(':hover'))).toBe(
      false
    )
    expect(tapped).toEqual(await readTouchStyles(tab))
  })
})
