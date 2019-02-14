/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Icon screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/icon' })
  it('have to match responsive icons', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="icon-medium"] div.react-live-preview'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
