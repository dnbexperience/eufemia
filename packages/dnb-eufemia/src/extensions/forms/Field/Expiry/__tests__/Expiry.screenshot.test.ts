import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Expiry field for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/feature-fields/Expiry/demos/',
    })

    test('have to match the empty state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="expiry-empty"]',
      })
    })

    test('have to match the input filled in value', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="expiry-with-value"]',
      })
    })

    test('have to match the horizontal layout', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="expiry-horizontal-layout"]',
      })
    })

    test('have to match expiry with help button', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="expiry-with-help"]',
      })
    })

    test('have to match the disabled state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="expiry-disabled"]',
      })
    })

    test('have to match the error state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="expiry-error"]',
      })
    })
  })
}
