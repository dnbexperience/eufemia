import {
  test,
  expect,
  makeScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('EditButton', () => {
  const url = '/uilib/extensions/forms/Wizard/EditButton/demos/'

  test('have to match button with hr', async () => {
    const screenshot = await makeScreenshot({
      url,
      wrapperStyle: {
        width: '25rem',
        'padding-left': '2.5rem',
        'padding-right': '2.5rem',
      },
      selector: '[data-visual-test="wizard-edit-button"] .dnb-forms-step',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
