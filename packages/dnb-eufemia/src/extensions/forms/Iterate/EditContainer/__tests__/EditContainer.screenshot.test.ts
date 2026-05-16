import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Iterate.EditContainer', () => {
  const url = '/uilib/extensions/forms/Iterate/EditContainer/demos/'

  it('have to match edit container with error', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="edit-container-error"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="edit-container-error"] .dnb-forms-submit-button',
      recalculateHeightAfterSimulate: true,
    })
  })
})
