/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Blockquote screenshot', () => {
  setupPageScreenshot({ url: '/uilib/elements/blockquote' })
  it('have to match default "blockquote"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="blockquote-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "blockquote" with top aligned graphic', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="blockquote-top"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
