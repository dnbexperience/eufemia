import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const path of [
  '/uilib/layout/space/',
  '/uilib/layout/space/demos/',
]) {
  test(`spacing diagram can be read with the keyboard on ${path}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(path)
    await waitForApp(page)

    const diagram = page.getByRole('region', {
      name: 'Spacing pattern comparison',
    })
    await expect(diagram).toHaveAttribute('tabindex', '0')
    await expect(diagram.locator('label')).toHaveCount(42)

    const lastValue = diagram.locator('label').last()
    await expect(lastValue).toHaveText('10')
    const before = await lastValue.boundingBox()
    expect(before).not.toBeNull()
    expect(before!.x).toBeGreaterThan(375)

    await diagram.focus()
    await expect(diagram).toBeFocused()
    for (let index = 0; index < 12; index++) {
      await diagram.press('ArrowRight', { delay: 100 })
    }
    await expect
      .poll(() => diagram.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0)
    await expect
      .poll(async () => {
        const value = await lastValue.boundingBox()
        const viewport = await diagram.boundingBox()
        return (
          value !== null &&
          viewport !== null &&
          value.x >= viewport.x &&
          value.x + value.width <= viewport.x + viewport.width + 1
        )
      })
      .toBe(true)
  })
}

test('spacing diagram fits without a keyboard scroll stop on desktop', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/uilib/layout/space/demos/')
  await waitForApp(page)

  const diagram = page.getByRole('region', {
    name: 'Spacing pattern comparison',
  })
  await expect(diagram).toBeVisible()
  await expect(diagram.locator('label')).toHaveCount(42)
  await expect(diagram).not.toHaveAttribute('tabindex', '0')
  expect(
    await diagram.evaluate((element) => {
      return element.scrollWidth <= element.clientWidth + 1
    })
  ).toBe(true)
})
