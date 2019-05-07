/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('DatePicker screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/date-picker' })
  it('have to match the closed date-picker', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="date-picker-closed"] .dnb-date-picker__shell'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the date-picker items', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="date-picker-calendar"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
