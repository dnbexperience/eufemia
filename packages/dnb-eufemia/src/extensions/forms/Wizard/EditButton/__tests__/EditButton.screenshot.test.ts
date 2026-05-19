import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('EditButton', () => {
  const url = '/uilib/extensions/forms/Wizard/EditButton/demos/'

  it('have to match button with hr', async () => {
    await makeScreenshot({
      url,
      wrapperStyle: {
        width: '25rem',
        'padding-left': '2.5rem',
        'padding-right': '2.5rem',
      },
      selector: '[data-visual-test="wizard-edit-button"] .dnb-forms-step',
    })
  })
})
