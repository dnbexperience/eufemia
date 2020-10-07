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
  setupPageScreenshot({ url: '/uilib/patterns/payment-card/demos' })
  it('have to match a basic card', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="payment-card-basic"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match all cards', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="all-cards"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
