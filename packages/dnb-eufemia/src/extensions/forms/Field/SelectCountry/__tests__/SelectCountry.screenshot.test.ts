/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/jest/jestSetupScreenshots'

describe('Field.String', () => {
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
})
