import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Wizard.Step', () => {
  const url = '/uilib/extensions/forms/Wizard/Step/demos/'
  it('have to match inactive', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="wizard-step-inactive"]',
    })
  })
})
