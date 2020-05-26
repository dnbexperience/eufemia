/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  isCI
} from '../../../core/jest/jestSetupScreenshots'

describe('Heading screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/heading/demos',
    screenshotConfig: {
      // use 11% on CI because of the font rendering differences
      pixelThresholdRelative: isCI ? 0.11 : 0
    }
  })
  it('have to match default headings', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="heading-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match headings in different locales', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="heading-locales"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match currency', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="heading-currency"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match phone', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="heading-phone"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match ban', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="heading-ban"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match nin', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="heading-nin"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
