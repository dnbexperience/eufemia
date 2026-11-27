import path from 'node:path'
import * as sass from 'sass'
import { expect, test } from '@playwright/test'
import type { Locator } from '@playwright/test'

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

// Moving the mouse sets the intent to mouse, while the last input stays
// keyboard. The focus outline must stay visible under the pointer (#11104).
test('keeps the keyboard focus outline when the mouse moves onto the focused tab', async ({
  page,
}) => {
  const css = sass.compile(
    path.resolve(__dirname, '../style/dnb-tabs.scss')
  ).css
  await page.setContent(`
    <style>
      :root {
        --token-color-stroke-action-focus: rgb(0, 114, 114);
        --focus-outline-width: 0.1875rem;
      }
      ${css}
    </style>
    <button class="dnb-tabs__button">Tab</button>
  `)

  const setIntent = (whatinput: string, whatintent: string) =>
    page.locator('html').evaluate(
      (element, { whatinput, whatintent }) => {
        element.dataset.whatinput = whatinput
        element.dataset.whatintent = whatintent
      },
      { whatinput, whatintent }
    )
  const tab = page.locator('.dnb-tabs__button')
  const outlineStyle = () =>
    tab.evaluate(
      (element) => getComputedStyle(element, '::before').outlineStyle
    )

  await page.keyboard.press('Tab')
  await setIntent('keyboard', 'keyboard')
  await expect(tab).toBeFocused()
  await expect.poll(outlineStyle).toBe('solid')

  await tab.hover()
  await setIntent('keyboard', 'mouse')
  await expect.poll(outlineStyle).toBe('solid')
})
