/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/jest/jestSetupScreenshots'

describe('NumberFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/date-format/demos',
  })

  it('have to match date styles', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-format-date-styles"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match date weekdays', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-format-weekdays"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match date days', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-format-days"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match date months', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-format-months"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match date years', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="date-format-years"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
