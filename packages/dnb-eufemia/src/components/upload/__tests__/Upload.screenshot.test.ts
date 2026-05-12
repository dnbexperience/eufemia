import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Upload for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/upload/demos/',
    })

    test('have to match the default', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-basic"]',
      })
    })

    test('have to match the compact variant', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-basic-compact-variant"]',
      })
    })

    test('have to match the compact variant file list', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-compact-variant-files-list"]',
      })
    })

    test('have to match the compact variant without labels', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="upload-basic-compact-variant-without-labels"]',
      })
    })

    test('have to match the files amount message', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-files-amount-message"]',
      })
    })

    test('have to hide upload button when files amount limit is met', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-files-amount-limit"]',
      })
    })

    test('have to match the loading state', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-is-loading"] .dnb-upload',
      })
    })

    test('have to match file list', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-file-list"]',
      })
    })

    test('have to match file max size based on file type table', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="upload-file-max-size-based-on-file-format"]',
      })
    })

    test('have to match disabled file max size', async () => {
      await makeScreenshot({
        style: { height: '14rem' },
        selector: '[data-visual-test="upload-disabled-file-max-size"]',
      })
    })

    test('have to match when not providing title and text', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-no-title-no-text"]',
      })
    })

    test('have to match anchor looks when displaying a button', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-on-file-click"]',
      })
    })

    test('have to match focus when displaying a button', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-on-file-click"]',
        simulate: 'focus',
        simulateSelector:
          '[data-visual-test="upload-on-file-click"] .dnb-upload__file-cell:nth-child(1) button',
      })
    })

    test('have to match when displaying text', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-file-empty-size"]',
      })
    })

    test('have to match when disabling drag and drop', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-disabled-drag-and-drop"]',
      })
    })

    test('have to match when file item has description', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-description"]',
      })
    })

    test('have to match anchor focus', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-description"]',
        simulate: 'focus',
        simulateSelector:
          '[data-visual-test="upload-description"] .dnb-upload__file-cell:nth-child(3) a',
      })
    })

    test('have to match when file item does not have delete button', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-remove-delete-button"]',
      })
    })

    test('have to match when disabled', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="upload-disabled"]',
      })
    })
  })
}

test.describe('Upload', () => {
  setupPageScreenshot({
    url: '/uilib/components/upload/demos/',
    pageViewport: {
      width: 480, // 30rem
    },
  })

  test('have to match small screens', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-basic"]',
    })
  })
})
