/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Anchor screenshot', () => {
  setupPageScreenshot({ url: '/uilib/elements/anchor' })
  it('have to match the default choice of anchor styles', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="anchor"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
