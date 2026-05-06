import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Currency field for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/forms/feature-fields/Currency/demos/',
    })

    test.describe('with step control buttons', () => {
      test('matches the default state', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="currency-input-step-controls"] .dnb-forms-field-number',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })
  })
}
