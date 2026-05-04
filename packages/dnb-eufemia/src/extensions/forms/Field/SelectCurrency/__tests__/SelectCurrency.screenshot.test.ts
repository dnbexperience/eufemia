import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

test.describe('Field.SelectCurrency', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/SelectCurrency/demos/',
  })

  test('match vertical layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-currency-vertical-layout"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('match horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-currency-horizontal-layout"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('match when opened', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-currency-opened"]',
      simulateSelector:
        '[data-visual-test="select-currency-opened"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      waitAfterSimulateSelector:
        '[data-visual-test="select-currency-opened"] .dnb-autocomplete--open',
      style: {
        height: '30rem',
      },
      executeBeforeSimulate: async () => {
        const element = document.querySelector(
          '[data-visual-test="select-currency-opened"]'
        )
        element.scrollIntoView({
          behavior: 'auto',
        })
      },
    })
    expect(screenshot).toMatchSnapshot()
  })
})
