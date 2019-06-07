/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('FormRow screenshot', () => {
  const style = {
    width: '22rem' // make sure our input gets an explicit width, because of mac/linux rendering differences
  }
  setupPageScreenshot({ url: '/uilib/components/form-row' })
  it('have to match default form-row', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="form-row-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match vertical form-row', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="form-row-vertical"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
