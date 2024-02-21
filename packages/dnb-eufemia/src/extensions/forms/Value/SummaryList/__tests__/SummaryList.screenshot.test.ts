import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Form.SummaryList', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/extended-features/Value/SummaryList/demos/',
  })

  it('have to match inside card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
