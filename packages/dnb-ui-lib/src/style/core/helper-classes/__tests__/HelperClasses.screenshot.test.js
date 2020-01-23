/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  // isCI,
  testPageScreenshot,
  setupPageScreenshot
} from '../../../../core/jest/jestSetupScreenshots'

describe('HelperClasses screenshot', () => {
  setupPageScreenshot({
    // screenshotConfig: {
    //   // use 11% on CI because of the font rendering differences
    //   pixelThresholdRelative: isCI ? 0.11 : 0
    // },
    url: '/uilib/helpers/helper-classes-examples'
  })
  it('have to match core-style', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-core-style"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match tap-focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-tap-focus"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match unstyled-list', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-unstyled-list"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match hide-on-mobile', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-hide-on-mobile"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match mobile-exclusive', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-mobile-exclusive"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match width-limit', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-width-limit"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match belt', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-belt"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match nudge', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-nudge"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match sr-only', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-sr-only"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match not-sr-only', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-not-sr-only"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
