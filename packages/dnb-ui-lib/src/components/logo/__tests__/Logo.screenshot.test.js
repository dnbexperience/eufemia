/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  setupPageScreenshot,
  testPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

setupPageScreenshot()

describe('Logo screenshot', () => {
  it('have to match the screenshot snapshot', async () => {
    const screenshot = await testPageScreenshot({
      url: '/uilib/components/logo?fullscreen',
      selector: '.example-box .dnb-logo:nth-child(1)'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
