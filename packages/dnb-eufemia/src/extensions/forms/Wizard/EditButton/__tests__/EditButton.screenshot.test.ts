import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('EditButton', () => {
  const url = '/uilib/extensions/forms/Wizard/EditButton'

  it('have to match button with hr', async () => {
    const screenshot = await makeScreenshot({
      url,
      style: {
        width: '20rem',
      },
      wrapperStyle: {
        'padding-left': '2.5rem',
        'padding-right': '2.5rem',
      },
      selector:
        '[data-visual-test="wizard-edit-button"] .dnb-forms-wizard-layout__contents',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
