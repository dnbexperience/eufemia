import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('HelpButton', () => {
  setupPageScreenshot({
    url: '/uilib/components/help-button/demos/',
  })

  test('have to match default help button', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="help-button-default"]',
    })
  })

  test('have to match help button sizes', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="help-button-sizes"]',
    })
  })

  test('have to match help button suffix', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="help-button-suffix"]',
    })
  })

  test('have to match help button used inside text', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="help-button-inline"]',
    })
  })
})
