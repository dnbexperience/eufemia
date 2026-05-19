import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Value.SummaryList', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/SummaryList/demos/',
  })

  it('have to match default layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-default"]',
    })
  })

  it('have to match grid layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-grid"]',
    })
  })

  it('have to match horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-horizontal"]',
    })
  })

  it('have to match combined layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="forms-value-summary-list-combined"]',
    })
  })

  it('have to match with help button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-with-help-button"]',
    })
  })

  it('have to match with max widths', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-with-max-width"]',
    })
  })

  it('have to match without a label', async () => {
    await makeScreenshot({
      style: { width: '6rem' },
      selector: '[data-visual-test="forms-value-summary-empty-label"]',
    })
  })

  it('have to match with help wrapped in info overlay', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-with-help-in-info-overlay"]',
    })
  })

  it('have to match default layout with help', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-default-with-help"]',
    })
  })

  it('have to match grid layout with help', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-grid-with-help"]',
    })
  })

  it('have to match grid layout with help and label', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-grid-with-help-and-label"]',
    })
  })

  it('have to match horizontal layout with help', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="forms-value-summary-list-horizontal-with-help"]',
    })
  })
})
