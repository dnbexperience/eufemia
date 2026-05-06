import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`ProgressIndicator for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/progress-indicator/demos/',
    })

    test('with label inside', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="progress-indicator-label-inside"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the static primary circular with 50 percentage', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-circular--primary"] .dnb-progress-indicator',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the static primary linear with 50 percentage', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector:
          '[data-visual-test="progress-indicator-linear--primary"] .dnb-progress-indicator',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('with custom colors and size', async () => {
      const screenshot = await makeScreenshot({
        style: {
          width: '20rem',
        },
        selector: '[data-visual-test="progress-indicator-customization"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match customized horizontal', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-custom-horizontal"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match customized  countdown', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="progress-indicator-custom-countdown"]',
      })
      expect(screenshot).toMatchSnapshot()
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
      const screenshot = await makeScreenshot({
        style: {
          height: '3.5rem',
          width: '8rem',
        },
        selector: '[data-visual-test="progress-indicator-sizes"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
