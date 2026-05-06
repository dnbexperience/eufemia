import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('ListFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/list-format/demos/',
  })

  test('have to match default list', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match custom format', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-custom-format"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match inline', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-inline"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match variants', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-variants"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match types', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-types"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to list format function', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="list-format-function"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
