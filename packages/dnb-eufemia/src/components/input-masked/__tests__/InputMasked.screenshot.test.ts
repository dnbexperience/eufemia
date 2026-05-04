import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Input for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/input-masked/demos/',
    })

    test('have to match currency_mask', async () => {
      const screenshot = await makeScreenshot({
        // style,
        selector: '[data-visual-test="input-masked-currency_mask"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match number_mask', async () => {
      const screenshot = await makeScreenshot({
        // style,
        selector: '[data-visual-test="input-masked-number_mask"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match locale number', async () => {
      const screenshot = await makeScreenshot({
        // style,
        selector: '[data-visual-test="input-masked-number"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match locale currency', async () => {
      const screenshot = await makeScreenshot({
        // style,
        selector: '[data-visual-test="input-masked-currency"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
