/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Upload screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/upload/demos' })

  it('have to match the default', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="upload-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the loading state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="upload-is-loading"] .dnb-upload',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match file list', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="upload-file-list"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
