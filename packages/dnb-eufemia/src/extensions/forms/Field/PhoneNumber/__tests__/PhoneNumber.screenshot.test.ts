import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/playwright/screenshotSetup'

const url = '/uilib/extensions/forms/feature-fields/PhoneNumber/demos/'

for (const themeName of ['ui']) {
  test.describe(`PhoneNumber for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url,
    })

    test('have to match with a label', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="phone-number-label"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with error', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="phone-number-error"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match widths', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '35rem' },
        selector: '[data-visual-test="phone-number-width"]',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

test.describe('PhoneNumber', () => {
  test('have to match medium screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 600,
      },
      selector: '[data-visual-test="phone-number-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match small screen', async () => {
    const screenshot = await makeScreenshot({
      url,
      pageViewport: {
        width: 300,
      },
      selector: '[data-visual-test="phone-number-label"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match long label', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-long-label"]',
      style: { width: '25rem' },
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match used in card', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-in-card"]',
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('matches when opened', async () => {
    const screenshot = await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-label"]',
      simulateSelector:
        '[data-visual-test="phone-number-label"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '30rem',
      },
    })
    expect(screenshot).toMatchSnapshot()
  })
})
