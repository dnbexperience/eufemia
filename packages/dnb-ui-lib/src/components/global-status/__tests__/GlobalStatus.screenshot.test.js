/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('GlobalStatus screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/global-status' })
  it.skip('have to match the global-status with icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="global-status"] .dnb-global-status'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it.skip('have to match the info state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="global-status-info"] .dnb-global-status'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it.skip('have to match custom content', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="global-status-custom"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
