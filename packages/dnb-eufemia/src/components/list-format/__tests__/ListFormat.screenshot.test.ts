import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('ListFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/list-format/demos/',
  })

  test('have to match default list', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-default"]',
    })
  })

  test('have to match custom format', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-custom-format"]',
    })
  })

  test('have to match inline', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-inline"]',
    })
  })

  test('have to match variants', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-variants"]',
    })
  })

  test('have to match types', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-types"]',
    })
  })

  test('have to list format function', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="list-format-function"]',
    })
  })
})
