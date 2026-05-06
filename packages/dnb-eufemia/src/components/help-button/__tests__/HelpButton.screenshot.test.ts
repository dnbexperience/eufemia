import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('HelpButton', () => {
  setupPageScreenshot({
    url: '/uilib/components/help-button/demos/',
  })

  test('have to match default help button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="help-button-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match help button sizes', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="help-button-sizes"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match help button suffix', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="help-button-suffix"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match help button used inside text', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="help-button-inline"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
