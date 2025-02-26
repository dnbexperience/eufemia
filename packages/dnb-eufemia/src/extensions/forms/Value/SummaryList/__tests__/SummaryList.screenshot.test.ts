import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Value.SummaryList', () => {
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

  it('have to match horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-horizontal"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match combined layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-combined"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match without a label', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '6rem' },
      selector: '[data-visual-test="forms-value-summary-empty-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match default layout with help', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-default-with-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match grid layout with help', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-grid-with-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match horizontal layout with help', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-horizontal-with-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
