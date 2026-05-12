import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Form.Appearance for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/Form/Appearance/demos/',
    })

    test('have to match size', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-appearance-size"]',
      })
    })

    test('have to match size nested', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="form-appearance-size-nested"]',
      })
    })
  })
}
