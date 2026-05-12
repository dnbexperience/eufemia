import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`ProgressIndicator for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/progress-indicator/demos/',
    })

    test('with label inside', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="progress-indicator-label-inside"]',
      })
    })

    test('have to match the static primary circular with 50 percentage', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-circular--primary"] .dnb-progress-indicator',
      })
    })

    test('have to match the static primary linear with 50 percentage', async () => {
      await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector:
          '[data-visual-test="progress-indicator-linear--primary"] .dnb-progress-indicator',
      })
    })

    test('with custom colors and size', async () => {
      await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector: '[data-visual-test="progress-indicator-customization"]',
      })
    })

    test('have to match customized horizontal', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-custom-horizontal"]',
      })
    })

    test('have to match customized  countdown', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-custom-countdown"]',
      })
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`ProgressIndicator circular for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/progress-indicator/visual-tests/',
    })

    test('have to match static primary circular sizes', async () => {
      await makeScreenshot({
        style: {
          height: '3.5rem',
          width: '8rem',
        },
        selector: '[data-visual-test="progress-indicator-sizes"]',
      })
    })
  })
}
