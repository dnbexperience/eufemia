import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Form.SummaryList', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/SummaryList/demos/',
  })

  it('have to match default layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match grid layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-grid"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match combined layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-combined"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
