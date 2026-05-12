import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Value.SummaryList', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/SummaryList/demos/',
  })

  test('have to match default layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-default"]',
    })
  })

  test('have to match grid layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-grid"]',
    })
  })

  test('have to match horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-horizontal"]',
    })
  })

  test('have to match combined layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-combined"]',
    })
  })

  test('have to match with help button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-with-help-button"]',
    })
  })

  test('have to match with max widths', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-with-max-width"]',
    })
  })

  test('have to match without a label', async () => {
    await makeScreenshot({
      style: { width: '6rem' },
      selector: '[data-visual-test="forms-value-summary-empty-label"]',
    })
  })

  test('have to match with help wrapped in info overlay', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-with-help-in-info-overlay"]',
    })
  })

  test('have to match default layout with help', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-default-with-help"]',
    })
  })

  test('have to match grid layout with help', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-grid-with-help"]',
    })
  })

  test('have to match grid layout with help and label', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-grid-with-help-and-label"]',
    })
  })

  test('have to match horizontal layout with help', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-horizontal-with-help"]',
    })
  })
})
