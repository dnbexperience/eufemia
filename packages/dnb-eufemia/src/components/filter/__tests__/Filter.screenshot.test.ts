import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui'])(`Filter for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/filter/demos/',
  })

  it('have to match date and selection filter', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="filter-date-selection"]',
    })
  })

  it('have to match date and selection filter with open panel', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="filter-date-selection"] .dnb-filter',
      recalculateHeightAfterSimulate: true,
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="filter-date-selection"] button[aria-expanded]',
    })
  })

  it('have to match multi-selection filter with grid layout', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="filter-multi-selection-grid"] .dnb-filter',
    })
  })

  it('have to match manual behavior with open panel', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="filter-manual-behavior"] .dnb-filter',
      recalculateHeightAfterSimulate: true,
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="filter-manual-behavior"] button[aria-expanded]',
    })
  })
})
