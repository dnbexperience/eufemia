/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Autocomplete screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/autocomplete/demos' })
  it.skip('have to match the closed autocomplete', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="autocomplete-closed"] .dnb-autocomplete__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
