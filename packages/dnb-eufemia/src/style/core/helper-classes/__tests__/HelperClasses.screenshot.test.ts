import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`HelperClasses for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/helpers/classes/visual-tests/',
    })

    test('have to match core-style', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        selector: '[data-visual-test="helper-core-style"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match tap-focus', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        selector: '[data-visual-test="helper-tap-focus"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match unstyled-list', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        selector: '[data-visual-test="helper-unstyled-list"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match sr-only', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        selector: '[data-visual-test="helper-sr-only"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match selection', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        selector: '[data-visual-test="helper-selection"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match fieldset reset', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="helper-fieldset-reset"] fieldset',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match focused skip link', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="skip-link"]',
        simulateSelector: '[data-visual-test="skip-link"] .dnb-skip-link',
        simulate: 'focus',
        waitAfterSimulate: 300,
        screenshotSelector:
          '[data-visual-test="skip-link"] .dnb-skip-link',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

test.describe('media', () => {
  const selector = '[data-visual-test="helper-media-offset"] ul'
  const url = '/uilib/helpers/classes/visual-tests/'

  test('have to match media offset for "isLarge"', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 1056,
      },
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match media offset for "isLarge" + offset', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 1057,
      },
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match media offset for below "isMedium"', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 736,
      },
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match media offset for below "isMedium" + offset', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 865,
      },
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match media offset for above "isMedium"', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 737,
      },
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match media offset for above "isMedium" + offset', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 864,
      },
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match media offset for "isSmall"', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 545,
      },
    })
    expect(screenshot).toMatchSnapshot()
  })

  test('have to match media offset for "isSmall" + offset', async () => {
    const screenshot = await makeScreenshot({
      selector,
      url,
      pageViewport: {
        width: 544,
      },
    })
    expect(screenshot).toMatchSnapshot()
  })
})
