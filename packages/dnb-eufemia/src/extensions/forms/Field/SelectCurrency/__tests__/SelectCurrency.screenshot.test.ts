/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Field.SelectCurrency', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/SelectCurrency/demos/',
  })

  it('match vertical layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-currency-vertical-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('match horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-currency-horizontal-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('match when opened', async () => {
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
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
