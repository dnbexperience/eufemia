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
      selector: '[data-dnb-test="pagination-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the centered pagination bar', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="pagination-centered"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match infinity load button', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="pagination-infinity-load-button"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
