import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Available width', () => {
  test.use({
    viewport: { width: 1280, height: 1000 },
    ...(process.env.PLAYWRIGHT_BASE_URL
      ? { baseURL: process.env.PLAYWRIGHT_BASE_URL }
      : {}),
  })
  test('keeps CSS and hooks aligned while the sidebar changes and preserves input', async ({
    page,
  }) => {
    await page.goto(
      '/uilib/layout/media-queries/#respond-to-the-space-your-app-has'
    )
    await waitForApp(page)
    const example = page.locator('[data-available-width-example]')
    const app = example.locator('[data-app-container]')
    const slider = example.getByRole('slider')

    // Use keyboard resizing to exercise the real control and keep the viewport fixed.
    await slider.press('Home')
    const viewport = page.viewportSize()
    const input = app.getByLabel('Account name')
    await input.fill('Travel savings')
    const assertParity = async () => {
      const result = await app.evaluate((element) => {
        const threshold =
          40 * parseFloat(getComputedStyle(element).fontSize)
        const size = parseFloat(getComputedStyle(element).width)
        const columns = getComputedStyle(
          element.querySelector('[data-width-columns]')
        ).gridTemplateColumns.split(' ').length
        return { wide: size > threshold, columns }
      })
      await expect(app.locator('[data-width-mode]')).toHaveText(
        result.wide ? 'Side by side layout' : 'Stacked layout'
      )
      await expect(app.locator('[data-width-query]')).toHaveText(
        result.wide ? 'Hook: above 40em' : 'Hook: 40em or less'
      )
      expect(result.columns).toBe(result.wide ? 2 : 1)
    }
    await assertParity()
    await slider.press('End')
    await expect(app.locator('[data-width-mode]')).toHaveText(
      'Stacked layout'
    )
    await assertParity()
    expect(page.viewportSize()).toEqual(viewport)
    await expect(input).toHaveValue('Travel savings')
    await example.getByLabel('Show sidebar', { exact: true }).uncheck()
    await assertParity()
    await expect(input).toHaveValue('Travel savings')
  })

  test('agrees at exact boundaries and after container font changes', async ({
    page,
  }) => {
    await page.goto('/uilib/layout/media-queries/')
    await waitForApp(page)
    const app = page.locator('[data-app-container]')
    for (const fontSize of [16, 20]) {
      for (const delta of [-0.25, 0, 0.25]) {
        await app.evaluate(
          (element, { fontSize, delta }) => {
            const target = element as HTMLElement
            target.style.fontSize = fontSize + 'px'
            target.style.width = 40 * fontSize + delta + 'px'
          },
          { fontSize, delta }
        )
        await expect(app.locator('[data-width-query]')).toHaveText(
          delta > 0 ? 'Hook: above 40em' : 'Hook: 40em or less'
        )
        await expect
          .poll(() =>
            app
              .locator('[data-width-columns]')
              .evaluate(
                (element) =>
                  getComputedStyle(element).gridTemplateColumns.split(' ')
                    .length
              )
          )
          .toBe(delta > 0 ? 2 : 1)
      }
    }
  })

  test('applies a viewport offset and restores zero offset', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto(
      '/uilib/layout/media-queries/#when-the-shell-already-knows-its-width'
    )
    await waitForApp(page)
    const example = page.locator('[data-available-width-offset]')
    const slider = example.getByRole('slider')
    await slider.press('End')
    await expect(example.getByRole('status')).toHaveText(
      'Application range: medium'
    )
    await example
      .getByRole('button', { name: 'No reserved space' })
      .click()
    await expect(example.getByRole('status')).toHaveText(
      'Application range: large'
    )
  })
})
