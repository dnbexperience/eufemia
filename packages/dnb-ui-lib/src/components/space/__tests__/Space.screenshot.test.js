/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  // isCI,
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Space screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/space'
    // screenshotConfig: {
    //   // use 7% on CI because of the font rendering differences
    //   pixelThresholdRelative: isCI ? 0.07 : 0
    // }
  })
  it('have to match default space', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '35rem' // make sure our input gets an explicit width, because of mac/linux rendering differences
      },
      selector: '[data-dnb-test="space-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical space label', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="space-vertical-label"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical space', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '15rem' // make sure our input gets an explicit width, because of mac/linux rendering differences
      },
      selector: '[data-dnb-test="space-vertical"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
