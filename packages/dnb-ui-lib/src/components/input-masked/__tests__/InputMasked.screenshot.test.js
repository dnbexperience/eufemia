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
  it('have to match masked input', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="input-masked-phone"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
