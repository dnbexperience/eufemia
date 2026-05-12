import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Stat for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/stat/demos/',
    })

    test('has to match basic usage', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="stat-amount-default"]',
      })
    })

    test('has to match root and label', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="stat-root-and-label"]',
      })
    })

    test('has to match currency within trend', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="stat-currency-within-trend"]',
      })
    })

    test('has to match currency default', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="stat-currency-default"]',
      })
    })

    test('has to match percent default', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="stat-percent-default"]',
      })
    })

    test('has to match percent colorize by sign', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="stat-percent-colorize-by-sign"]',
      })
    })

    test('has to match rating default', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="stat-rating-default"]',
      })
    })

    test('has to match content-label-order with subtle label', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="stat-content-label-order-subtle-label"]',
      })
    })
  })
}
