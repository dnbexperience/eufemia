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

  it('matches vertical layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-currency-vertical-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('matches horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="select-currency-horizontal-layout"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
