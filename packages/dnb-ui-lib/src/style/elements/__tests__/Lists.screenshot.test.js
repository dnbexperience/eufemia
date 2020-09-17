/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
  // isCI
} from '../../../core/jest/jestSetupScreenshots'

describe('List screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/elements/lists'
    // screenshotConfig: {
    //   // use 6% on CI because of the font rendering differences
    //   pixelThresholdRelative: isCI ? 0.06 : 0
    // }
  })
  // the first one is on 5.54%
  it('have to match ul list', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="lists-ul"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match ol list', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="lists-ol"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match outside ol list', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="lists-ol-style-position"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match ol list with custom types', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="lists-ol-types"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match dl list', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="lists-dl"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match lists rest', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="lists-reset"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
