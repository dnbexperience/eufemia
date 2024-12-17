import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Form.SubmitIndicator', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Form/SubmitIndicator/demos',
  })

  it('have to match submit-indicator-with-label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="submit-indicator-with-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
