/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('CountryFlag', () => {
  setupPageScreenshot({
    url: '/uilib/components/country-flag/demos',
  })

  it('have to match sizes', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="country-flag-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match shape', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="country-flag-shape"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match in various components', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="country-flag-in-components"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
