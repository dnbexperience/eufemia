import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('DateFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/date-format/demos',
  })

  test('have to match date styles', async ({ page }) => {
    const screenshot = await makeScreenshot({
      page,
      selector: '[data-visual-test="date-format-date-styles"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match date when inline', async ({ page }) => {
    const screenshot = await makeScreenshot({
      page,
      selector: '[data-visual-test="date-format-date-inline"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
