import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Form.SubmitIndicator', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/SubmitIndicator/demos/',
  })

  test('have to match submit-indicator-with-label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="submit-indicator-with-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
