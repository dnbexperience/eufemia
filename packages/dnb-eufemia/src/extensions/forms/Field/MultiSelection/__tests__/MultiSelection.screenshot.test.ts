import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('MultiSelection', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/MultiSelection/demos/',
  })

  it('should match trigger button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="multi-selection-basic"]',
    })
  })

  it('should match variant inline', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="multi-selection-variant-inline"]',
    })
  })

  it('should match hover state of item', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="multi-selection-variant-inline"]',
      screenshotSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
      simulate: 'hover',
      simulateSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
    })
  })

  it('should match active state of item', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="multi-selection-variant-inline"]',
      screenshotSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
      simulate: 'active',
      simulateSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
    })
  })

  it('should match focus state of item', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="multi-selection-variant-inline"]',
      screenshotSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2)',
      simulate: 'focus',
      simulateSelector:
        '[data-visual-test="multi-selection-variant-inline"] ul li:nth-of-type(2) input',
    })
  })
})
