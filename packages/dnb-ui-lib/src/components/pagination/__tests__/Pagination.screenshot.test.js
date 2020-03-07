/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  // isCI,
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe.skip('Pagination screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/pagination/demos' })

  it('have to match the calendar', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="pagination-bar"] .dnb-pagination'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
