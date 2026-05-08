import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Stat for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/stat/demos/',
    })

    test('has to match basic usage', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="stat-amount-default"]',
      })

      expect(screenshot).toMatchSnapshot()
    })

    test('has to match root and label', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="stat-root-and-label"]',
      })

      expect(screenshot).toMatchSnapshot()
    })

    test('has to match currency within trend', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="stat-currency-within-trend"]',
      })

      expect(screenshot).toMatchSnapshot()
    })

    test('has to match currency default', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="stat-currency-default"]',
      })

      expect(screenshot).toMatchSnapshot()
    })

    test('has to match percent default', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="stat-percent-default"]',
      })

      expect(screenshot).toMatchSnapshot()
    })

    test('has to match percent colorize by sign', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="stat-percent-colorize-by-sign"]',
      })

      expect(screenshot).toMatchSnapshot()
    })

    test('has to match rating default', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="stat-rating-default"]',
      })

      expect(screenshot).toMatchSnapshot()
    })

    test('has to match content-label-order with subtle label', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="stat-content-label-order-subtle-label"]',
      })

      expect(screenshot).toMatchSnapshot()
    })
  })
}
