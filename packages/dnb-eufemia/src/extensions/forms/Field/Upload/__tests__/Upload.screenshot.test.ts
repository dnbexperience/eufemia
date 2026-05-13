import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Upload', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/base-fields/Upload/demos/',
  })

  test('have to match upload-field-customized', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-field-customized"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-field-help-button"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match help button without labelDescription', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="upload-field-help-button-without-label-description"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match help button in compact variant', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-field-compact-help-button"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '40rem' },
      selector: '[data-visual-test="upload-field-width"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
