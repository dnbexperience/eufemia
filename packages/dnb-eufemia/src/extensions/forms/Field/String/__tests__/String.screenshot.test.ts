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
    url: '/uilib/extensions/forms/base-fields/String/demos/',
  })

  it('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="string-widths"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match multiple errors', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="multiple-errors"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
