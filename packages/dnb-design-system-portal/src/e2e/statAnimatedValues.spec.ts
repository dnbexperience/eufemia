import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('animated Stat currencies stay together in narrow example containers', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/web/components/stat/demos/#animated-updates')
  await waitForApp(page)
  const example = page.locator('#AnimatedUpdates .dnb-live-preview')
  const update = example.getByRole('button', { name: 'Update values' })
  const currencies = example.locator(
    '.dnb-stat__content:has(> .dnb-stat__currency)'
  )
  await expect(currencies).toHaveCount(4)

  for (const width of [400, 224, 800]) {
    await example.evaluate((element: HTMLElement, width) => {
      element.style.width = `${width}px`
    }, width)

    for (let step = 0; step < 4; step++) {
      await update.click()
      await expect
        .poll(() =>
          currencies.evaluateAll((elements) =>
            elements.every((element) => {
              const amount = element
                .querySelector('.dnb-stat__amount')
                .getBoundingClientRect()
              const currency = element
                .querySelector('.dnb-stat__currency')
                .getBoundingClientRect()
              const bounds = element.getBoundingClientRect()
              const column = element
                .closest('.dnb-stat__root')
                .getBoundingClientRect()
              const firstColumn = elements[0]
                .closest('.dnb-stat__root')
                .getBoundingClientRect()
              return (
                Math.abs(column.width - firstColumn.width) < 1 &&
                Math.abs(amount.top - currency.top) < 1 &&
                Math.min(amount.left, currency.left) >= bounds.left - 1 &&
                Math.max(amount.right, currency.right) <= bounds.right + 1
              )
            })
          )
        )
        .toBe(true)
    }
  }
})
