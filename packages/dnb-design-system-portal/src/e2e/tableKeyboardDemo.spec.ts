import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [375, 1440]) {
  test(`keyboard Table example stays usable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/uilib/components/table/demos/')
    await waitForApp(page)

    const table = page.getByRole('table', {
      name: 'Keyboard navigable table',
    })
    const scroller = table.locator('..')
    await expect(scroller).toHaveClass(/dnb-table__scroll-view/)
    await expect(table.locator('tbody tr')).toHaveCount(4)

    const firstRow = table.locator('tbody tr').first()
    const name = firstRow.getByRole('textbox', {
      name: 'Name',
      exact: true,
    })
    await name.focus()
    await name.evaluate((element: HTMLInputElement) => {
      element.setSelectionRange(3, 3)
    })
    await page.keyboard.press('ArrowRight')
    const email = firstRow.getByRole('textbox').nth(1)
    await expect(email).toBeFocused()
    await email.evaluate((element: HTMLInputElement) => {
      element.setSelectionRange(14, 14)
    })
    await page.keyboard.press('ArrowRight')
    const action = firstRow.getByRole('button', { name: 'Delete row' })
    await expect(action).toBeFocused()
    await expect
      .poll(async () => {
        const button = await action.boundingBox()
        const region = await scroller.boundingBox()
        return (
          button !== null &&
          region !== null &&
          button.x >= region.x &&
          button.x + button.width <= region.x + region.width + 1
        )
      })
      .toBe(true)
    if (width === 375) {
      expect(
        await scroller.evaluate((element) => element.scrollLeft)
      ).toBeGreaterThan(0)
    }
  })
}
