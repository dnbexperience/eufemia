import {
  test,
  makeScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Wizard.Step', () => {
  const url = '/uilib/extensions/forms/Wizard/Step/demos/'
  test('have to match inactive', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="wizard-step-inactive"]',
    })
  })
})
