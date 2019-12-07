/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  isCI
} from '../../../core/jest/jestSetupScreenshots'

describe('Number screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/number/number-examples',
    screenshotConfig: {
      // use 11% on CI because of the font rendering differences
      pixelThresholdRelative: isCI ? 0.11 : 0
    }
  })
  it('have to match default numbers', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="number-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match numbers in different locales', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="number-locales"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match currency', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="number-currency"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match phone', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="number-phone"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match ban', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="number-ban"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match nin', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="number-nin"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
