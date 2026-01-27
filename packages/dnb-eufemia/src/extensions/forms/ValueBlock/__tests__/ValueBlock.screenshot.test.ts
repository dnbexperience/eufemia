import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

const url = '/uilib/extensions/forms/create-component/ValueBlock/demos/'

describe.each(['ui', 'sbanken'])('ValueBlock for %s', (themeName) => {
  setupPageScreenshot({
    url,
    themeName,
  })

  it('should match inline value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="value-block-inline"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="value-block-help-button"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match help button with html', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="value-block-help-button-html"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-block-widths"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match wrapping', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-block-wrapping"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
