/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('Layout.FieldBlock', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/create-component/FieldBlock/demos/',
  })

  it('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-widths"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
