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

  it('have to match upload displaying size', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match list upload inline', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match label and value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-label-and-value"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match label and value with on file click', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="upload-value-label-and-value-on-file-click"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-lists"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match list with on file click', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-lists-on-file-click"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
