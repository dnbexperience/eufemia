import { expect, test } from '@playwright/test'

for (const viewportWidth of [375, 500, 1024]) {
  test.describe(`Selection long text at ${viewportWidth}px`, () => {
    test.use({
      viewport: { width: viewportWidth, height: 900 },
      reducedMotion: 'reduce',
    })

    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/uilib/extensions/forms/base-fields/Selection/demos/'
      )
      await page
        .locator(
          '[data-visual-test="selection-dropdown-long-selection"] button'
        )
        .first()
        .waitFor()
      await page.evaluate(() => document.fonts.ready)
    })

    for (const layout of ['vertical', 'horizontal']) {
      for (const width of [
        'default',
        'small',
        'medium',
        'large',
        'stretch',
        '12rem',
      ]) {
        test(`truncates the selection with ${layout} layout and ${width} width`, async ({
          page,
        }) => {
          const example = page.locator(
            '[data-visual-test="selection-dropdown-long-selection"]'
          )
          const trigger = example.getByRole('combobox', {
            name: `${layout}, ${width} width`,
            exact: true,
          })
          const dimensions = await trigger.evaluate((button) => {
            const container = button.closest(
              '[data-testid="selection-long-text-container"]'
            )
            const text = button.querySelector<HTMLElement>(
              '.dnb-dropdown__text__inner'
            )
            return {
              triggerRight: button.getBoundingClientRect().right,
              containerRight: container.getBoundingClientRect().right,
              viewportWidth: document.documentElement.clientWidth,
              textWidth: text.clientWidth,
              fullTextWidth: text.scrollWidth,
              textOverflow: getComputedStyle(text).textOverflow,
            }
          })

          expect(dimensions.triggerRight).toBeLessThanOrEqual(
            dimensions.containerRight + 1
          )
          expect(dimensions.triggerRight).toBeLessThanOrEqual(
            dimensions.viewportWidth
          )
          expect(dimensions.textWidth).toBeLessThan(
            dimensions.fullTextWidth
          )
          expect(dimensions.textOverflow).toBe('ellipsis')

          await trigger.click()
          await expect(
            page.getByRole('option', {
              name: /A very long selected option/,
            })
          ).toBeVisible()
          await expect(
            page.getByRole('option', { name: 'Short option', exact: true })
          ).toBeVisible()
          await page
            .getByRole('option', { name: 'Short option', exact: true })
            .click()
          await expect(trigger).toContainText('Short option')
        })
      }
    }
  })
}

test('preserves predefined widths when there is enough space', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/uilib/extensions/forms/base-fields/Selection/demos/')
  const example = page.locator(
    '[data-visual-test="selection-dropdown-widths"]'
  )
  await expect(example.getByRole('combobox')).toHaveCount(5)

  const widths = await example
    .getByRole('combobox')
    .evaluateAll((buttons) =>
      buttons.map((button) => button.getBoundingClientRect().width)
    )
  expect(widths.slice(0, 4)).toEqual([336, 80, 176, 336])
  expect(widths[4]).toBeGreaterThan(336)
})
