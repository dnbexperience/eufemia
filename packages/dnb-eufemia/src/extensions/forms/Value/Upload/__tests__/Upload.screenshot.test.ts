import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Value.Upload', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/Value/Upload/demos/',
  })

  test('have to match default upload value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match upload displaying size', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-size"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match list upload inline', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-inline"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match label and value', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-label-and-value"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match label and value with on file click', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="upload-value-label-and-value-on-file-click"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-lists"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match list with on file click', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="upload-value-lists-on-file-click"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match files as non-clickable', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="upload-value-display-file-as-non-clickable"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
