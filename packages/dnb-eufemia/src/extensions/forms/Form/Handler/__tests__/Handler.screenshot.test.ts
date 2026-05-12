import {
  test,
  makeScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Form.Handler', () => {
  const url = '/uilib/extensions/forms/Form/Handler/demos/'

  test('have to match required and optional fields', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="required-and-optional-fields"]',
    })
  })
})
