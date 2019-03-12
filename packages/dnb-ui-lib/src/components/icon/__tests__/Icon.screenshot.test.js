/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  isCI
} from '../../../core/jest/jestSetupScreenshots'

describe('Icon screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/icon',
    // use 10% on CI because of the font rendering differences
    pixelThresholdRelative: isCI ? 0.1 : 0
  })
  it('have to match responsive icons', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="icon-medium"] div.react-live-preview'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
