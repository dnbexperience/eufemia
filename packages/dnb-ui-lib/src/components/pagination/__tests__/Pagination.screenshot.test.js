/**
 * Screenshot Test
 *
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Pagination screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/pagination/demos' })

  it('have to match the default pagination bar', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="pagination-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
