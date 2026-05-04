import {
  test,
  expect,
  makeScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Form.Handler', () => {
  const url = '/uilib/extensions/forms/Form/Handler/demos/'

  test('have to match required and optional fields', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="required-and-optional-fields"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
