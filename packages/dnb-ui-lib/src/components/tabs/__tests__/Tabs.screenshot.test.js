/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  setupPageScreenshot,
  testPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

setupPageScreenshot()

describe('Tabs screenshot', () => {
  it('have to match the "Tablist" screenshot snapshot', async () => {
    const screenshot = await testPageScreenshot({
      url: '/uilib/components/tabs?fullscreen',
      selector: '.example-box:nth-child(1) .dnb-tabs'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "Tabs" screenshot snapshot, right aligned', async () => {
    const screenshot = await testPageScreenshot({
      url: '/uilib/components/tabs?fullscreen',
      selector: '.example-box:nth-child(4) .dnb-tabs'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
