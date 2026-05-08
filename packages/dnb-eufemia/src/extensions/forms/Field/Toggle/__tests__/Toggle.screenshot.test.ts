import {
  test,
  expect,
  makeScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Field.Toggle', () => {
  const url = '/uilib/extensions/forms/base-fields/Toggle/demos/'

  test('have to match buttons variant with help', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-buttons-with-help"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match buttons variant without label', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector:
        '[data-visual-test="toggle-variant-buttons-without-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match radio variant with help', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-radio-with-help"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match radio variant without label', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-radio-without-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
