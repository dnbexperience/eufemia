import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('CountryFlag', () => {
  setupPageScreenshot({
    url: '/uilib/components/country-flag/demos/',
  })

  it('have to match sizes', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="country-flag-sizes"]',
    })
  })

  it('have to match shape', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="country-flag-shape"]',
    })
  })
  it('have to match in various components', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="country-flag-in-components"]',
    })
  })
})
