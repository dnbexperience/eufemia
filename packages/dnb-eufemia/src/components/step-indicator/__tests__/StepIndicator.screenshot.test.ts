import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`StepIndicator for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    pageViewport: {
      width: 1280,
      height: 1024,
    },
    url: '/uilib/components/step-indicator/demos/',
  })

  it('have to match statuses', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-statuses"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="step-indicator-statuses"] .dnb-step-indicator__trigger__button',
      recalculateHeightAfterSimulate: true,
    })
  })

  it('initially expanded', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-expanded"]',
    })
  })

  it('have to match loose mode', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-loose"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="step-indicator-loose"] .dnb-step-indicator__trigger__button',
      recalculateHeightAfterSimulate: true,
    })
  })

  it('have to match loose mode after click simulation', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-loose"]',
      simulate: [
        {
          action: 'click',
          selector:
            '[data-visual-test="step-indicator-loose"] .dnb-step-indicator__trigger__button',
        },
        {
          action: 'click',
          selector:
            '[data-visual-test="step-indicator-loose"] .dnb-step-indicator__item:nth-of-type(3) .dnb-step-indicator__button',
        },
      ],
      recalculateHeightAfterSimulate: true,
    })
  })

  it('have to match strict mode', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger__button',
      recalculateHeightAfterSimulate: true,
    })
  })

  it('have to match strict mode after click simulation', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
      simulate: [
        {
          action: 'click',
          selector:
            '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger__button',
        },
        {
          action: 'click',
          selector:
            '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__item:nth-of-type(1) .dnb-step-indicator__button',
        },
      ],
      recalculateHeightAfterSimulate: true,
    })
  })

  it('have to match static mode after click simulation', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-static"]',
      simulateSelector:
        '[data-visual-test="step-indicator-static"] .dnb-step-indicator__trigger__button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
  })

  it('have to match skeleton', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-skeleton"]',
    })
  })
})

describe.each(['ui', 'sbanken'])(`StepIndicator for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/step-indicator/demos/',
    pageViewport: {
      width: 500,
      height: 600,
    },
  })

  it('have to match loose mode for small screens', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-loose"]',
    })
  })

  it('have to match strict mode for small screens', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
    })
  })

  it('have to match strict mode for small screens after click simulation', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
      simulateSelector:
        '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger__button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
  })
})
