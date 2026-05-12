import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('Field.SelectCurrency', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/SelectCurrency/demos/',
  })

  test('match vertical layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-currency-vertical-layout"]',
    })
  })

  test('match horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-currency-horizontal-layout"]',
    })
  })

  test('match when opened', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-currency-opened"]',
      simulateSelector:
        '[data-visual-test="select-currency-opened"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
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
  })
})
