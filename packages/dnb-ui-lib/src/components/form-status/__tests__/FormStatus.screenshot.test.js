/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('FormStatus screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/form-status/demos' })
  const style = {
    'max-width': '60rem' // make sure our input gets an explicit width, because of mac/linux rendering differences
  }
  it('have to match the form-status with icon', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="form-status"] .dnb-form-status'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the info state', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="form-status-info"] .dnb-form-status'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match custom content', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="form-status-custom"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
