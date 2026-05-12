import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  test.describe(`Colors ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/usage/customisation/colors/',
    })

    test('have to all colors', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="color-table"]',
        withWrapper: false,
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
