import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('NumberFormat', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos/',
  })

  test('have to match default numbers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match percent numbers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-percent"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match compact numbers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-compact"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match numbers in different locales', async () => {
    const screenshot = await makeScreenshot({
      style: { height: '30rem' },
      selector: '[data-visual-test="number-format-locales"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match currency', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-currency"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match phone', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-phone"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match ban', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-ban"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match nin', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-nin"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match org', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-org"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match spacing system usage', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-spacing"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match monospace', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-monospace"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})

test.describe('NumberFormat with skeleton', () => {
  setupPageScreenshot({
    url: '/uilib/components/number-format/demos/?skeleton',
  })

  test('have to match default numbers', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-default"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match currency', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-currency"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match phone', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="number-format-phone"]',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
