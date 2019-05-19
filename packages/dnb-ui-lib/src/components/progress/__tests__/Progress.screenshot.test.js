/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Progress screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/progress' })
  it('have to match the static primary circular with 50 percentage', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="progress-circular--primary"] .dnb-progress'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
