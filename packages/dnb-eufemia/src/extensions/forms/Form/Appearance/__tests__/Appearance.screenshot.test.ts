import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Form.Appearance for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/Form/Appearance/demos/',
    })

    test('have to match size', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="form-appearance-size"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match size nested', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="form-appearance-size-nested"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
