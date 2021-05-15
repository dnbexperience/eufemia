/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Logo screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/logo/demos' })
  it('have to match the default "Logo"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="logo-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the auto sized "Logo"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="logo-auto-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the inherited sized "Logo"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="logo-inherit-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
