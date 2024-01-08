/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Currency field for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/forms/feature-fields/Currency',
  })

  describe('with step control buttons', () => {
    it('matches the default state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="currency-input-step-controls"] .dnb-forms-field-number',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
