/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import { testPageScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Textarea screenshot', () => {
  const url = '/uilib/elements/textarea?fullscreen'
  it('have to match the "default" textarea style', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector: '[data-dnb-test="textarea-default"]',
      padding: true
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "active" textarea style', async () => {
    const screenshot = await testPageScreenshot({
      url,
      selector: '[data-dnb-test="textarea-default"]',
      simulate: 'active',
      padding: true
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
