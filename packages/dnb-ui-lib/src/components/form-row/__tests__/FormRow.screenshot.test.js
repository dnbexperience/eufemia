/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  // isCI,
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('FormRow screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/form-row'
    // screenshotConfig: {
    //   // use 7% on CI because of the font rendering differences
    //   pixelThresholdRelative: isCI ? 0.07 : 0
    // }
  })
  it('have to match default form-row', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '35rem' // make sure our input gets an explicit width, because of mac/linux rendering differences
      },
      selector: '[data-dnb-test="form-row-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical form-row label', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-row-vertical-label"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical form-row', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '25rem' // make sure our input gets an explicit width, because of mac/linux rendering differences
      },
      selector: '[data-dnb-test="form-row-vertical"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
