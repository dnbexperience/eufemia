/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  isCI
} from '../../../core/jest/jestSetupScreenshots'

describe('Anchor screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/elements/anchor',
    screenshotConfig: {
      // use 6% on CI because of the font rendering differences
      pixelThresholdRelative: isCI ? 0.06 : 0
    }
  })
  // the first one is on 5.54%
  it('have to match the "default" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="anchor-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "hover" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="anchor-hover"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "active" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="anchor-active"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "focus" state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="anchor-focus"]',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
