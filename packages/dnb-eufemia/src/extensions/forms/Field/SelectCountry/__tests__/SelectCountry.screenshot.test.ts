/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Field.SelectCountry', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/feature-fields/SelectCountry/demos/',
  })

  it('matches vertical layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-country-vertical-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-country-horizontal-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches when opened', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-country-opened"]',
      simulateSelector:
        '[data-visual-test="select-country-opened"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      waitAfterSimulateSelector:
        '[data-visual-test="select-country-opened"] .dnb-autocomplete--open',
      style: {
        height: '30rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
