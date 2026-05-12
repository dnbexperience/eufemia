import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Value.Upload', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/Upload/demos/',
  })

  test('have to match default upload value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-default"]',
    })
  })

  test('have to match upload displaying size', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-size"]',
    })
  })

  test('have to match list upload inline', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-inline"]',
    })
  })

  test('have to match label and value', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-label-and-value"]',
    })
  })

  test('have to match label and value with on file click', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="upload-value-label-and-value-on-file-click"]',
    })
  })

  test('have to match list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-lists"]',
    })
  })

  test('have to match list with on file click', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-value-lists-on-file-click"]',
    })
  })

  test('have to match files as non-clickable', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="upload-value-display-file-as-non-clickable"]',
    })
  })
})
