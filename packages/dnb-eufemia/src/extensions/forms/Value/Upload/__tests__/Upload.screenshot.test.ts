import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Value.Upload', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/Upload/demos/',
  })

  it('have to match default upload value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to list upload inline', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to list upload value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-lists"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
