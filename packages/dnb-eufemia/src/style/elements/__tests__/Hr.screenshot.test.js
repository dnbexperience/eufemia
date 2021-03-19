/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('List screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/elements/horizontal-rule'
  })
  it('have to match default horizontal rule', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="hr-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match fullscreen horizontal rule', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="hr-fullscreen"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match thickness horizontal rule', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="hr-thickness"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
