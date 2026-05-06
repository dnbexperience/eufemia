import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui']) {
  test.describe(`VippsWalletButton for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/extensions/vipps-wallet-button/',
    })

    test('have to match default state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match hover state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button"]',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match active state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button"]',
        simulate: 'active',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match focus state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button"]',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match pending state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="vipps-wallet-button-pending"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
