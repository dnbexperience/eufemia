import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`StepIndicator for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      pageViewport: {
        width: 1280,
        height: 1024,
      },
      url: '/uilib/components/step-indicator/demos/',
    })

    test('have to match statuses', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="step-indicator-statuses"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="step-indicator-statuses"] .dnb-step-indicator__trigger__button',
        recalculateHeightAfterSimulate: true,
      })
    })

    test('initially expanded', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="step-indicator-expanded"]',
      })
    })

    test('have to match loose mode', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="step-indicator-loose"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="step-indicator-loose"] .dnb-step-indicator__trigger__button',
        recalculateHeightAfterSimulate: true,
      })
    })

    test('have to match loose mode after click simulation', async () => {
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

    test('have to match strict mode', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="step-indicator-strict"]',
        simulate: 'click',
        simulateSelector:
          '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger__button',
        recalculateHeightAfterSimulate: true,
      })
    })

    test('have to match strict mode after click simulation', async () => {
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

    test('have to match static mode after click simulation', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="step-indicator-static"]',
        simulateSelector:
          '[data-visual-test="step-indicator-static"] .dnb-step-indicator__trigger__button',
        simulate: 'click',
        recalculateHeightAfterSimulate: true,
      })
    })

    test('have to match skeleton', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="step-indicator-skeleton"]',
      })
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`StepIndicator for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/step-indicator/demos/',
      pageViewport: {
        width: 500,
        height: 600,
      },
    })

    test('have to match loose mode for small screens', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="step-indicator-loose"]',
      })
    })

    test('have to match strict mode for small screens', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="step-indicator-strict"]',
      })
    })

    test('have to match strict mode for small screens after click simulation', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="step-indicator-strict"]',
        simulateSelector:
          '[data-visual-test="step-indicator-strict"] .dnb-step-indicator__trigger__button',
        simulate: 'click',
        recalculateHeightAfterSimulate: true,
      })
    })
  })
}
