/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Space screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/space'
  })
  it('have to match the spacing patterns', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="spacing-patterns"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
