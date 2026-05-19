import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Field.SelectCurrency', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/SelectCurrency/demos/',
  })

  it('match vertical layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-currency-vertical-layout"]',
    })
  })

  it('match horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-currency-horizontal-layout"]',
    })
  })

  it('match when opened', async () => {
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
