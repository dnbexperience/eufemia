/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('InputMasked screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/input-masked' })
  const style = {
    width: '200px' // make sure our input gets an explicit width, because of mac/linux rendering differences
  }
  it('have to match masked input', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="input-masked-phone"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
