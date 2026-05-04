import {
  test,
  expect,
  makeScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

const url = '/uilib/extensions/forms/Form/Card/demos/'

test.describe('Form.Card', () => {
  test('have to match when used in wizard', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="forms-card-in-wizard"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
