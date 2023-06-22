/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('DatePicker', () => {
  setupPageScreenshot({ url: '/uilib/components/date-picker/demos' })

  it('have to match the input fields', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-input"] .dnb-date-picker__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the date-picker with input in error state', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '400px', // make sure our input gets an explicit width, because of mac/linux rendering differences
      },
      selector:
        '[data-visual-test="date-picker-input-error"] .dnb-date-picker__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the sizes', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-picker-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the disabled states', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-picker-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the calendar', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-calendar"] .dnb-date-picker',
      waitBeforeSimulate: 200,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the date-picker trigger button', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-trigger-default"] .dnb-date-picker__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the date-picker trigger button in error state', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-trigger-error"] .dnb-date-picker__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
