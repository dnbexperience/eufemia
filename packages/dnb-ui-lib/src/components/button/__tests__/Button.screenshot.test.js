/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  setupPageScreenshot,
  testPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

setupPageScreenshot()

describe('Button screenshot', () => {
  it('have to match the "dnb-button--primary" screenshot snapshot', async () => {
    const screenshot = await testPageScreenshot({
      url: '/uilib/components/button?fullscreen',
      selector: '.example-box .dnb-button.dnb-button--primary:nth-child(1)'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "dnb-button--secondary" screenshot snapshot', async () => {
    const screenshot = await testPageScreenshot({
      url: '/uilib/components/button?fullscreen',
      selector:
        '.example-box .dnb-button.dnb-button--secondary:nth-child(1)'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
