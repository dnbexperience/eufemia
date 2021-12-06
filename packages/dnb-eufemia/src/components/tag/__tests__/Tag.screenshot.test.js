/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Tag screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/tag/demos' })

  it('have to match Tag default', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tag-default"] .dnb-tag',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
