/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])(
  'WordDefinition (%s theme)',
  (themeName) => {
    setupPageScreenshot({
      url: '/uilib/components/word-definition/demos',
      themeName,
    })

    it('matches the closed trigger state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="word-definition-closed"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)
