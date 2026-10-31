import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [320, 375, 1440]) {
  test(`Wizard status-message button fits at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/uilib/extensions/forms/Wizard/Container/demos/')
    await waitForApp(page)

    const example = page.locator(
      '[data-visual-test="wizard-with-status-message"]'
    )
    const next = example.getByRole('button', {
      name: 'Press me to see the status message',
      exact: true,
    })
    await expect(next).toHaveCount(1)
    await expect
      .poll(() =>
        next.evaluate((element) => {
          const button = element.getBoundingClientRect()
          const preview = element
            .closest('.dnb-live-preview')!
            .getBoundingClientRect()
          return button.right <= preview.right + 1
        })
      )
      .toBe(true)
    await next.click()
    await expect(example).toContainText('Info message.')
    await expect(example).toContainText('Warning message.')
    await expect(
      example.getByRole('heading', { name: 'Step 1' })
    ).toBeVisible()
  })
}
