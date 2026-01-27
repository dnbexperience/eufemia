import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/feature-fields/Date/demos'

describe.each(['ui'])('Date for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('should match with a label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match with a horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-horizontal-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match with an error', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-error"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match width', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="date-width"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
