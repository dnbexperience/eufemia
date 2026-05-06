import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Value.SummaryList', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/SummaryList/demos/',
  })

  test('have to match default layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match grid layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-grid"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-horizontal"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match combined layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-combined"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match with help button', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-with-help-button"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match with max widths', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-with-max-width"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match without a label', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '6rem' },
      selector: '[data-visual-test="forms-value-summary-empty-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match with help wrapped in info overlay', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-with-help-in-info-overlay"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match default layout with help', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-default-with-help"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match grid layout with help', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-grid-with-help"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match grid layout with help and label', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-grid-with-help-and-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match horizontal layout with help', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-horizontal-with-help"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
