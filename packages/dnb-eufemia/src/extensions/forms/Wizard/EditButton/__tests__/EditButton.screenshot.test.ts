import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('EditButton', () => {
  const url = '/uilib/extensions/forms/Wizard/EditButton'

  it('should match button with hr', async () => {
    const screenshot = await makeScreenshot({
      url,
      wrapperStyle: {
        width: '25rem',
        'padding-left': '2.5rem',
        'padding-right': '2.5rem',
      },
      selector: '[data-visual-test="wizard-edit-button"] .dnb-forms-step',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
