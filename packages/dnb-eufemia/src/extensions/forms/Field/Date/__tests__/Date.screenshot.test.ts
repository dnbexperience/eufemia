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

  it('have to match with a label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with a horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-horizontal-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with an error', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-error"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
