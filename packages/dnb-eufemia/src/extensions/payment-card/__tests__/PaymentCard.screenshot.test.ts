import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('PaymentCard', () => {
  setupPageScreenshot({ url: '/uilib/extensions/payment-card/demos/' })

  test('have to match a basic card', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="payment-card-basic"]',
    })
  })

  test('have to match a card with status', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="payment-card-status"]',
    })
  })

  test('have to match a compact card variant', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="payment-card-compact"]',
    })
  })

  test('have to match all cards', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="all-cards"]',
    })
  })
})
