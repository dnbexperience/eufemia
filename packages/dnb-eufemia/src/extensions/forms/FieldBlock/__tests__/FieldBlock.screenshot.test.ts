/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('FieldBlock', () => {
  setupPageScreenshot({
    url: '/uilib/extensions/forms/create-component/FieldBlock/demos/',
  })

  it('have to match widths', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-widths"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match label size', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-label-size"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match label description', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="forms-field-block-label-description"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
