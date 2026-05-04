import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('PaymentCard', () => {
  setupPageScreenshot({ url: '/uilib/extensions/payment-card/demos/' })

  test('have to match a basic card', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="payment-card-basic"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match a card with status', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="payment-card-status"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match a compact card variant', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="payment-card-compact"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match all cards', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="all-cards"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
