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

test('enters the selected tab and follows the active panel in reading order', async ({
  page,
}) => {
  await page.goto('/web/components/tabs/visual-tests/keyboard/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const overview = page.getByRole('tab', { name: 'Overview' })
  const links = page.getByRole('tab', { name: 'Links' })
  const details = page.getByRole('tab', { name: 'Details' })
  const panel = page.getByTestId('keyboard-tabs').getByRole('tabpanel')

  await page.getByRole('button', { name: 'Before tabs' }).press('Tab')
  await expect(overview).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(links).toBeFocused()
  await expect(panel).toHaveAccessibleName('Overview')
  await page.keyboard.press('Tab')
  await expect(panel).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(
    panel.getByRole('link', { name: 'More information' })
  ).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Shift+Tab')
  await expect(overview).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(details).toBeFocused()
  await page.keyboard.press('Space')
  await expect(panel).toHaveAccessibleName('Details')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('Enter')
  await expect(panel).toHaveAccessibleName('Overview')
  await expect(panel).toBeFocused()

  await links.click()
  await page.keyboard.press('Tab')
  await expect(
    panel.getByRole('link', { name: 'Read details' })
  ).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('button', { name: 'After tabs' })
  ).toBeFocused()
})

test('leaves vertical scrolling keys to the page', async ({ page }) => {
  await page.goto('/web/components/tabs/visual-tests/keyboard/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const tab = page.getByRole('tab', { name: 'Overview' })
  await tab.focus()
  const scrollY = () => page.evaluate(() => window.scrollY)
  for (const [down, up] of [
    ['ArrowDown', 'ArrowUp'],
    ['PageDown', 'PageUp'],
  ]) {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'instant' })
    )
    await page.keyboard.press(down)
    await expect.poll(scrollY).toBeGreaterThan(0)
    await expect(tab).toBeFocused()

    const bottom = await page.evaluate(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'instant',
      })
      return window.scrollY
    })
    await page.keyboard.press(up)
    await expect.poll(scrollY).toBeLessThan(bottom)
    await expect(tab).toBeFocused()
  }
})

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
