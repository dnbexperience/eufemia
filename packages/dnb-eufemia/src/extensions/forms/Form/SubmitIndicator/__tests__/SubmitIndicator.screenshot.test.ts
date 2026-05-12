import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Form.SubmitIndicator', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/SubmitIndicator/demos/',
  })

  test('have to match submit-indicator-with-label', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="submit-indicator-with-label"]',
    })
  })
})
