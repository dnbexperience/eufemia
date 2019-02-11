/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import { testPageScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Blockquote screenshot', () => {
  const url = '/uilib/elements/blockquote?fullscreen'
  it('have to match defualt "blockquote"', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector: '[data-dnb-test="blockquote-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "blockquote" with top aligned graphic', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector: '[data-dnb-test="blockquote-top"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
