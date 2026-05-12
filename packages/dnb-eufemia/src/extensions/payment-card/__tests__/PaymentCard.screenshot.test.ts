import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('PaymentCard', () => {
  setupPageScreenshot({ url: '/uilib/extensions/payment-card/demos/' })

  it('have to match a basic card', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="payment-card-basic"]',
    })
  })

  it('have to match a card with status', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="payment-card-status"]',
    })
  })

  it('have to match a compact card variant', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="payment-card-compact"]',
    })
  })

  it('have to match all cards', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="all-cards"]',
    })
  })
})
