/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Table screenshot', () => {
  setupPageScreenshot({ url: '/uilib/elements/tables' })
  it('have to match the default choice of table styles', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="table"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
