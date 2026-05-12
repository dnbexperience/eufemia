import {
  test,
  makeScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Field.Toggle', () => {
  const url = '/uilib/extensions/forms/base-fields/Toggle/demos/'

  test('have to match buttons variant with help', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-buttons-with-help"]',
    })
  })

  test('have to match buttons variant without label', async () => {
    await makeScreenshot({
      url,
      selector:
        '[data-visual-test="toggle-variant-buttons-without-label"]',
    })
  })

  test('have to match radio variant with help', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-radio-with-help"]',
    })
  })

  test('have to match radio variant without label', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="toggle-variant-radio-without-label"]',
    })
  })
})
