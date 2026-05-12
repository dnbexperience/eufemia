import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('DateFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/date-format/demos',
  })

  test('have to match date styles', async ({ page }) => {
    await makeScreenshot({
      page,
      selector: '[data-visual-test="date-format-date-styles"]',
    })
  })

  test('have to match date when inline', async ({ page }) => {
    await makeScreenshot({
      page,
      selector: '[data-visual-test="date-format-date-inline"]',
    })
  })
})
