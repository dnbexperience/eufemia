/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('HelpButton screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/help-button/demos'
  })
  it('have to match default help button', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="help-button-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match help button with information icon', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="help-button-information"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
