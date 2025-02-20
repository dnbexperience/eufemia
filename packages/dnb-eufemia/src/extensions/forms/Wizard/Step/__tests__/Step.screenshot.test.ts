import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('Wizard.Step', () => {
  const url = '/uilib/extensions/forms/Wizard/Step/demos'
  it('have to match inactive', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="wizard-step-inactive"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
