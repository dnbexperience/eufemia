import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Upload', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/Upload/demos/',
  })

  test('have to match upload-field-customized', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-field-customized"]',
    })
  })

  test('have to match help button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-field-help-button"]',
    })
  })

  test('have to match help button without labelDescription', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="upload-field-help-button-without-label-description"]',
    })
  })

  test('have to match help button in compact variant', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="upload-field-compact-help-button"]',
    })
  })

  test('have to match widths', async () => {
    await makeScreenshot({
      style: { width: '40rem' },
      selector: '[data-visual-test="upload-field-width"]',
    })
  })
})
