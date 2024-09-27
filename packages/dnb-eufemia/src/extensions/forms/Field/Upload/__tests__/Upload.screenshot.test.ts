import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Upload', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/more-fields/Upload/demos',
  })

  it('have to match upload-field-customized', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-field-customized"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
