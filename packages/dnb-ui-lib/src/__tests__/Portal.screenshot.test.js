/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
  isCI
} from './../core/jest/jestSetupScreenshots'

describe.skip('Portal screenshot', () => {
  if (isCI) {
    return it('skipping portal screenshot tests', () => {})
  }
  setupPageScreenshot({
    url: '/uilib/typography',
    fullscreen: false
  })
  it('have to match the typography page', async () => {
    const screenshot = await testPageScreenshot({
      padding: false,
      selector: 'body'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
