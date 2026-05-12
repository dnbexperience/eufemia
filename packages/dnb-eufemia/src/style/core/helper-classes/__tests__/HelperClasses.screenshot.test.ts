import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`HelperClasses for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/helpers/classes/visual-tests/',
    })

    test('have to match core-style', async () => {
      await makeScreenshot({
        withWrapper: false,
        selector: '[data-visual-test="helper-core-style"]',
      })
    })

    test('have to match tap-focus', async () => {
      await makeScreenshot({
        withWrapper: false,
        selector: '[data-visual-test="helper-tap-focus"]',
      })
    })

    test('have to match unstyled-list', async () => {
      await makeScreenshot({
        withWrapper: false,
        selector: '[data-visual-test="helper-unstyled-list"]',
      })
    })

    test('have to match sr-only', async () => {
      await makeScreenshot({
        withWrapper: false,
        selector: '[data-visual-test="helper-sr-only"]',
      })
    })

    test('have to match selection', async () => {
      await makeScreenshot({
        withWrapper: false,
        selector: '[data-visual-test="helper-selection"]',
      })
    })

    test('have to match fieldset reset', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="helper-fieldset-reset"] fieldset',
      })
    })

    test('have to match focused skip link', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="skip-link"]',
        simulateSelector: '[data-visual-test="skip-link"] .dnb-skip-link',
        simulate: 'focus',
        screenshotSelector:
          '[data-visual-test="skip-link"] .dnb-skip-link',
      })
    })
  })
}

test.describe('media', () => {
  const selector = '[data-visual-test="helper-media-offset"] ul'
  const url = '/uilib/helpers/classes/visual-tests/'

  test('have to match media offset for "isLarge"', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 1056,
      },
    })
  })

  test('have to match media offset for "isLarge" + offset', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 1057,
      },
    })
  })

  test('have to match media offset for below "isMedium"', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 736,
      },
    })
  })

  test('have to match media offset for below "isMedium" + offset', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 865,
      },
    })
  })

  test('have to match media offset for above "isMedium"', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 737,
      },
    })
  })

  test('have to match media offset for above "isMedium" + offset', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 864,
      },
    })
  })

  test('have to match media offset for "isSmall"', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 545,
      },
    })
  })

  test('have to match media offset for "isSmall" + offset', async () => {
    await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 544,
      },
    })
  })
})
