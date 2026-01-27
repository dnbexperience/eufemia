/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../../../core/jest/jestSetupScreenshots'

describe('Iterate.EditContainer', () => {
  const url = '/uilib/extensions/forms/Iterate/EditContainer/demos'

  it('should match edit container with error', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="edit-container-error"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="edit-container-error"] .dnb-forms-submit-button',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
