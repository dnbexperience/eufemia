/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
  // isCI
} from '../../../core/jest/jestSetupScreenshots'

describe('List screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/elements/horizontal-rule'
  })
  it('have to match default horizontal rule', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="hr-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match fullscreen horizontal rule', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="hr-fullscreen"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match thickness horizontal rule', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="hr-thickness"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
