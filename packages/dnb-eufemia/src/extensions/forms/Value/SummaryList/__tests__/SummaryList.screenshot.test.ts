import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Value.SummaryList', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/SummaryList/demos/',
  })

  it('should match default layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match grid layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-grid"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-horizontal"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match combined layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-combined"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match with help button', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-with-help-button"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match with max widths', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-with-max-width"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match without a label', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '6rem' },
      selector: '[data-visual-test="forms-value-summary-empty-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match with help wrapped in info overlay', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-with-help-in-info-overlay"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match default layout with help', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-default-with-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match grid layout with help', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-grid-with-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match grid layout with help and label', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-grid-with-help-and-label"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match horizontal layout with help', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-horizontal-with-help"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
