import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Field.SelectCountry', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/SelectCountry/demos/',
  })

  it('matches vertical layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-country-vertical-layout"]',
    })
  })

  it('matches horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-country-horizontal-layout"]',
    })
  })

  it('matches when opened', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="select-country-opened"]',
      simulateSelector:
        '[data-visual-test="select-country-opened"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '30rem',
      },
    })
  })
})
