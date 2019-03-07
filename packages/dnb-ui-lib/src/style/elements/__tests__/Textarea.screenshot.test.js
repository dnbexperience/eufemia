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
      selector: '[data-dnb-test="textarea-default"]',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-dnb-test="textarea-default"] textarea',
      style: { width: '14rem' }
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  // we do not make a active state, due to the differences of font rendering
})
