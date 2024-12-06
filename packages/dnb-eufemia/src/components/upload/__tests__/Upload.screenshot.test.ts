/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Upload for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/upload/demos',
  })

  it('have to match the default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the loading state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-is-loading"] .dnb-upload',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match file list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-file-list"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match file max size based on file type table', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="upload-file-max-size-based-on-file-format"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled file max size', async () => {
    const screenshot = await makeScreenshot({
      style: { height: '14rem' },
      selector: '[data-visual-test="upload-disabled-file-max-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match when not providing title and text', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-no-title-no-text"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match anchor looks when displaying a button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-on-file-click"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Upload', () => {
  setupPageScreenshot({
    url: '/uilib/components/upload/demos',
    pageViewport: {
      width: 480, // 30rem
    },
  })

  it('have to match small screens', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
