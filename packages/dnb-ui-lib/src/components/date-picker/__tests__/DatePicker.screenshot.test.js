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

  // skip the input fields, as there is a linux input issue
  it.skip('have to match the input fields', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="date-picker-input"] .dnb-date-picker__shell'
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the calendar', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="date-picker-calendar"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
