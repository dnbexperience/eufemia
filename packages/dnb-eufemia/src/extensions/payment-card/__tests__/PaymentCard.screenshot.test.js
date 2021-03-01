/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 *
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('PaymentCard screenshot', () => {
  setupPageScreenshot({ url: '/uilib/extensions/payment-card/demos' })
  it('have to match a basic card', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="payment-card-basic"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match a card with status', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="payment-card-status"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match a compact card variant', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="payment-card-compact"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match all cards', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="all-cards"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
