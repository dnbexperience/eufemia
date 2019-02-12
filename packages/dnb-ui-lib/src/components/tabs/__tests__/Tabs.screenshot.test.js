/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Tabs screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/tabs' })
  it('have to match the "Tablist"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="tabs-tablist"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "Tabs", right aligned', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="tabs-tabs"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
