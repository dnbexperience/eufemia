import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [320, 375, 390, 1440]) {
  test(`rich Dropdown example fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/uilib/components/dropdown/demos/')
    await waitForApp(page)

    const example = page.locator(
      '[data-visual-test="dropdown-list-item-content"]'
    )
    const trigger = example.getByRole('combobox')
    await expect(trigger).toHaveCount(1)
    await expect
      .poll(() =>
        trigger.evaluate((element) => {
          const bounds = element.getBoundingClientRect()
          const preview = element.closest('.dnb-live-preview')!
          const available = preview.getBoundingClientRect()
          return bounds.right <= available.right + 1
        })
      )
      .toBe(true)

    await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const option = page.getByRole('option').filter({ hasText: 'Accounts' })
    await expect(option).toHaveCount(1)
    await expect(option).toContainText('Bills, Savings')
    const bounds = await option.boundingBox()
    expect(bounds).not.toBeNull()
    expect(bounds!.x).toBeGreaterThanOrEqual(0)
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1)
    await expect(option).toBeVisible()
    await option.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toHaveText('Accounts')
  })
}
