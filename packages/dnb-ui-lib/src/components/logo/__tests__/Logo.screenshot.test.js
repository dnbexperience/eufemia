/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import { testPageScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Logo screenshot', () => {
  it('have to match the default "Logo"', async () => {
    const screenshot = await testPageScreenshot({
      url: '/uilib/components/logo?fullscreen',
      selector: '.example-box:nth-child(1) .dnb-logo:first-child'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
