import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../../core/vitest-screenshots/setupVitestScreenshots'

const url = '/uilib/extensions/forms/feature-fields/PhoneNumber/demos/'

for (const themeName of ['ui']) {
  test.describe(`PhoneNumber for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url,
    })

    test('have to match with a label', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="phone-number-label"]',
      })
    })

    test('have to match with error', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="phone-number-error"]',
      })
    })

    test('have to match widths', async () => {
      await makeScreenshot({
        style: { width: '35rem' },
        selector: '[data-visual-test="phone-number-width"]',
      })
    })
  })
}

test.describe('PhoneNumber', () => {
  test('have to match medium screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 600,
      },
      selector: '[data-visual-test="phone-number-label"]',
    })
  })

  test('have to match small screen', async () => {
    await makeScreenshot({
      url,
      pageViewport: {
        width: 300,
      },
      selector: '[data-visual-test="phone-number-label"]',
    })
  })

  test('have to match long label', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-long-label"]',
      style: { width: '25rem' },
    })
  })

  test('have to match used in card', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-in-card"]',
    })
  })

  test('matches when opened', async () => {
    await makeScreenshot({
      url,
      selector: '[data-visual-test="phone-number-label"]',
      simulateSelector:
        '[data-visual-test="phone-number-label"] .dnb-autocomplete .dnb-input',
      simulate: 'click',
      style: {
        height: '30rem',
      },
    })
  })
})
