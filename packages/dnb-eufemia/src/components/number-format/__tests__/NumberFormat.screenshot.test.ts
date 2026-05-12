import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

test.describe('NumberFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos/',
  })

  test('have to match default numbers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-default"]',
    })
  })

  test('have to match percent numbers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-percent"]',
    })
  })

  test('have to match compact numbers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-compact"]',
    })
  })

  test('have to match numbers in different locales', async () => {
    await makeScreenshot({
      style: { height: '30rem' },
      selector: '[data-visual-test="number-format-locales"]',
    })
  })

  test('have to match currency', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-currency"]',
    })
  })

  test('have to match phone', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-phone"]',
    })
  })

  test('have to match ban', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-ban"]',
    })
  })

  test('have to match nin', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-nin"]',
    })
  })

  test('have to match org', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-org"]',
    })
  })

  test('have to match spacing system usage', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-spacing"]',
    })
  })

  test('have to match monospace', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-monospace"]',
    })
  })
})

test.describe('NumberFormat with skeleton', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos/?skeleton',
  })

  test('have to match default numbers', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-default"]',
    })
  })

  test('have to match currency', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-currency"]',
    })
  })

  test('have to match phone', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="number-format-phone"]',
    })
  })
})
