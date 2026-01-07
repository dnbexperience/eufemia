/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('StepIndicator for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    pageViewport: {
      width: 1280,
      height: 1024,
    },
    url: '/uilib/components/step-indicator/demos',
  })

  it('have to match statuses', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-statuses"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="step-indicator-statuses"] .dnb-step-indicator__trigger-button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('initially expanded', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-expanded"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match loose mode', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-loose"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="step-indicator-loose"] .dnb-step-indicator__trigger-button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match loose mode after click simulation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-loose"]',
      simulate: [
        {
          action: 'click',
          selector:
            '[data-visual-test="step-indicator-loose"] .dnb-step-indicator__item:nth-of-type(3) button',
        },
      ],
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match strict mode', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger-button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match strict mode after click simulation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
      simulate: [
        {
          action: 'click',
          selector:
            '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__item:nth-of-type(1) button',
        },
      ],
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match static mode after click simulation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-static"]',
      simulateSelector:
        '[data-visual-test="step-indicator-static"] .dnb-step-indicator__trigger-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match skeleton', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-skeleton"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// eslint-disable-next-line jest/no-identical-title
describe.each(['ui', 'sbanken'])('StepIndicator for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/step-indicator/demos',
    pageViewport: {
      width: 500,
      height: 600,
    },
  })

  it('have to match loose mode for small screens', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-loose"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match strict mode for small screens', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match strict mode for small screens after click simulation', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="step-indicator-strict"]',
      simulateSelector:
        '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger-button',
      simulate: 'click',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// Can be removed in v11
describe('deprecated', () => {
  describe.each(['ui', 'sbanken'])('StepIndicator for %s', (themeName) => {
    setupPageScreenshot({
      themeName,
      pageViewport: {
        width: 1280,
        height: 1024,
      },
      url: '/uilib/components/step-indicator/deprecated-visual-tests',
    })

    it('have to match statuses', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="step-indicator-statuses"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="step-indicator-statuses"] .dnb-step-indicator__trigger-button',
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match loose mode', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="step-indicator-loose"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="step-indicator-loose"] .dnb-step-indicator__trigger-button',
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match loose mode after click simulation', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="step-indicator-loose"]',
        simulate: [
          {
            action: 'click',
            selector:
              '[data-visual-test="step-indicator-loose"] .dnb-step-indicator__item:nth-of-type(3) button',
          },
        ],
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match strict mode', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="step-indicator-strict"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger-button',
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match strict mode after click simulation', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="step-indicator-strict"]',
        simulate: [
          {
            action: 'click',
            selector:
              '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__item:nth-of-type(1) button',
          },
        ],
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match static mode after click simulation', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="step-indicator-static"]',
        simulateSelector:
          '[data-visual-test="step-indicator-static"] .dnb-step-indicator__trigger-button',
        simulate: 'click',
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })

  // eslint-disable-next-line jest/no-identical-title
  describe.each(['ui', 'sbanken'])('StepIndicator for %s', (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/step-indicator/demos',
      pageViewport: {
        width: 500,
        height: 600,
      },
    })

    it('have to match loose mode for small screens', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="step-indicator-loose"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match strict mode for small screens', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="step-indicator-strict"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match strict mode for small screens after click simulation', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="step-indicator-strict"]',
        simulateSelector:
          '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger-button',
        simulate: 'click',
        recalculateHeightAfterSimulate: true,
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
