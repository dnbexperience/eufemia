/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import { testPageScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Anchor screenshot', () => {
  const url = '/uilib/elements/anchor?fullscreen'
  it('have to match the default choice of anchor styles', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector: '[data-dnb-test="anchor"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
