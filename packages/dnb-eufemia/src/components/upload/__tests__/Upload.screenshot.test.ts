import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Upload for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/upload/demos/',
  })

  it('have to match the default', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-basic"]',
    })
  })

  it('have to match the compact variant', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-basic-compact-variant"]',
    })
  })

  it('have to match the compact variant file list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-compact-variant-files-list"]',
    })
  })

  it('have to match the compact variant without labels', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="upload-basic-compact-variant-without-labels"]',
    })
  })

  it('have to match the files amount message', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-files-amount-message"]',
    })
  })

  it('have to hide upload button when files amount limit is met', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-files-amount-limit"]',
    })
  })

  it('have to match the loading state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-is-loading"] .dnb-upload',
    })
  })

  it('have to match file list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-file-list"]',
    })
  })

  it('have to match file max size based on file type table', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="upload-file-max-size-based-on-file-format"]',
    })
  })

  it('have to match disabled file max size', async () => {
    await makeScreenshot({
      style: { height: '14rem' },
      selector: '[data-visual-test="upload-disabled-file-max-size"]',
    })
  })

  it('have to match when not providing title and text', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-no-title-no-text"]',
    })
  })

  it('have to match anchor looks when displaying a button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-on-file-click"]',
    })
  })

  it('have to match focus when displaying a button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-on-file-click"]',
      simulate: 'focus',
      simulateSelector:
        '[data-visual-test="upload-on-file-click"] .dnb-upload__file-cell:nth-child(1) button',
    })
  })

  it('have to match when displaying text', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-file-empty-size"]',
    })
  })

  it('have to match when disabling drag and drop', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-disabled-drag-and-drop"]',
    })
  })

  it('have to match when file item has description', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-description"]',
    })
  })

  it('have to match anchor focus', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-description"]',
      simulate: 'focus',
      simulateSelector:
        '[data-visual-test="upload-description"] .dnb-upload__file-cell:nth-child(3) a',
    })
  })

  it('have to match when file item does not have delete button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-remove-delete-button"]',
    })
  })

  it('have to match when disabled', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-disabled"]',
    })
  })
})

describe('Upload', () => {
  setupPageScreenshot({
    url: '/uilib/components/upload/demos/',
    pageViewport: {
      width: 480, // 30rem
    },
  })

  it('have to match small screens', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-basic"]',
    })
  })
})
