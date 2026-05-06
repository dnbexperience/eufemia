import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Expiry field for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/feature-fields/Expiry/demos/',
    })

    test('have to match the empty state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="expiry-empty"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the input filled in value', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="expiry-with-value"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the horizontal layout', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="expiry-horizontal-layout"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match expiry with help button', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="expiry-with-help"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the disabled state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="expiry-disabled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the error state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="expiry-error"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
