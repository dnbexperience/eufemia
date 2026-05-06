import {
  test,
  expect,
  makeScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Wizard.Step', () => {
  const url = '/uilib/extensions/forms/Wizard/Step/demos/'
  test('have to match inactive', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="wizard-step-inactive"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
