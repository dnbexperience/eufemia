import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Upload', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/more-fields/Upload/demos',
  })

  it('should match upload-field-customized', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-field-customized"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-field-help-button"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match help button without labelDescription', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="upload-field-help-button-without-label-description"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match help button in compact variant', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-field-compact-help-button"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match widths', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '40rem' },
      selector: '[data-visual-test="upload-field-width"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
