import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Input for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/input-masked/demos/',
    })

    test('have to match currency_mask', async () => {
      await makeScreenshot({
        // style,
        selector: '[data-visual-test="input-masked-currency_mask"]',
      })
    })

    test('have to match number_mask', async () => {
      await makeScreenshot({
        // style,
        selector: '[data-visual-test="input-masked-number_mask"]',
      })
    })

    test('have to match locale number', async () => {
      await makeScreenshot({
        // style,
        selector: '[data-visual-test="input-masked-number"]',
      })
    })

    test('have to match locale currency', async () => {
      await makeScreenshot({
        // style,
        selector: '[data-visual-test="input-masked-currency"]',
      })
    })
  })
}
