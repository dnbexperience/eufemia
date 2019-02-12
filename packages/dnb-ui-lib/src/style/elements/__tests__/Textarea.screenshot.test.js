/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Textarea screenshot', () => {
  setupPageScreenshot({ url: '/uilib/elements/textarea' })
  it('have to match the "default" textarea style', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="textarea-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "active" textarea style', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="textarea-default"]',
      simulate: 'active'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
