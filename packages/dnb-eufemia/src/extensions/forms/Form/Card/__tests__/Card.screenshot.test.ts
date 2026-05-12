import {
  test,
  makeScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/Form/Card/demos/'

test.describe('Form.Card', () => {
  test('have to match when used in wizard', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="forms-card-in-wizard"]',
    })
  })
})
