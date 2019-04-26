/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../../core/jest/jestSetupScreenshots'

describe('Helper Classes screenshot', () => {
  setupPageScreenshot({ url: '/uilib/helper-classes' })
  it('have to match defualt "Section"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="helper-classes-section"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
