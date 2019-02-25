/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('FormStatus screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/form-status' })
  it('have to match the form-status with icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="form-status"] .dnb-form-status'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
