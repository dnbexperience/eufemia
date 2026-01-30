import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/feature-fields/DateOfBirth/demos/'

describe.each(['ui'])('DateOfBirth for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url,
  })

  it('have to match default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match label and value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-label-and-value"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with help', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with disabled', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with error', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-error"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-of-birth-width"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
