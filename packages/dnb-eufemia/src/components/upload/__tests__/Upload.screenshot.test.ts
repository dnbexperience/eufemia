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

  it('have to match the compact variant', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-basic-compact-variant"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the compact variant file list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-compact-variant-files-list"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the compact variant without labels', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="upload-basic-compact-variant-without-labels"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the files amount message', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-files-amount-message"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to hide upload button when files amount limit is met', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-files-amount-limit"]',
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

  it('have to match focus when displaying a button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-on-file-click"]',
      simulate: 'focus',
      simulateSelector:
        '[data-visual-test="upload-on-file-click"] .dnb-upload__file-cell:nth-child(1) button',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match when displaying text', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-file-empty-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match when disabling drag and drop', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-disabled-drag-and-drop"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match when file item has description', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-description"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match anchor focus', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-description"]',
      simulate: 'focus',
      simulateSelector:
        '[data-visual-test="upload-description"] .dnb-upload__file-cell:nth-child(3) a',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match when file item does not have delete button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-remove-delete-button"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match when disabled', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-disabled"]',
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
