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
      selector: '[data-visual-test="upload-is-loading"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the custom accepted formats', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="upload-accepted-formats"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the custom text', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="upload-custom-text"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
