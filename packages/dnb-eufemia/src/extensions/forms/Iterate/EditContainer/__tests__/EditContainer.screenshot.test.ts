import {
  test,
  expect,
  makeScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Iterate.EditContainer', () => {
  const url = '/uilib/extensions/forms/Iterate/EditContainer/demos/'

  test('have to match edit container with error', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="edit-container-error"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="edit-container-error"] .dnb-forms-submit-button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchSnapshot()
  })
})
