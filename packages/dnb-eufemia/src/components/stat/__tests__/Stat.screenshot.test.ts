/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Stat', () => {
  setupPageScreenshot({
    url: '/uilib/components/stat/demos/',
  })

  it('has to match basic usage', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="stat-amount-default"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('has to match root and label', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="stat-root-and-label"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('has to match currency within trend', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="stat-currency-within-trend"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('has to match currency default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="stat-currency-default"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('has to match percent default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="stat-percent-default"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('has to match percent colorize by sign', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="stat-percent-colorize-by-sign"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('has to match colorize by sign default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="stat-colorize-by-sign-default"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('has to match rating default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="stat-rating-default"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })

  it('has to match content-label-order with subtle label', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="stat-content-label-order-subtle-label"]',
    })

    expect(screenshot).toMatchImageSnapshot()
  })
})
