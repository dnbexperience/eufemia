import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Autocomplete for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/autocomplete/demos/',
      pageViewport: {
        height: 1024, // The height influences this test: data-visual-test="autocomplete-drawer-search"
      },
    })

    // Run this test as one of the first because it's scroll-sensitive
    // Browser scroll position affects the list height
    test('have to match autocomplete with search result', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="autocomplete-drawer-search"]',
        simulateSelector:
          '[data-visual-test="autocomplete-drawer-search"] .dnb-autocomplete .dnb-input',
        simulate: 'click',
        style: {
          height: '30rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Autocomplete for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/autocomplete/demos/',
    })

    test('have to match different sizes', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="autocomplete-sizes"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match custom input width', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="autocomplete-input-width"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match autocomplete with drawer-button', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="autocomplete-drawer-button"] .dnb-autocomplete__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the closed autocomplete', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="autocomplete-closed"] .dnb-autocomplete__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match autocomplete with suffix value', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="autocomplete-suffix"]',
        simulateSelector:
          '[data-visual-test="autocomplete-suffix"] .dnb-autocomplete .dnb-input',
        simulate: 'click',
        style: {
          height: '25rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match autocomplete with groups', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="autocomplete-groups"]',
        simulateSelector:
          '[data-visual-test="autocomplete-groups"] .dnb-autocomplete .dnb-input',
        simulate: 'click',
        style: {
          height: '29rem',
        },
        simulateAfter: { keypress: 'Escape' },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the status with status_state information', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="autocomplete-status-information"] .dnb-autocomplete__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the status with status_state error', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="autocomplete-status-error"] .dnb-autocomplete__inner',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Autocomplete for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/autocomplete/demos/',
      pageViewport: {
        width: 700,
      },
    })

    test('have to match small screen autocomplete with suffix value', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="autocomplete-suffix"]',
        style: {
          height: '4rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Autocomplete for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/autocomplete/visual-tests/',
    })

    test('have to match disabled state', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="autocomplete-disabled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match disabled options', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="autocomplete-disabled-options"]',
        simulateSelector:
          '[data-visual-test="autocomplete-disabled-options"] .dnb-autocomplete .dnb-input',
        simulate: 'click',
        style: {
          height: '25rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match autocomplete opened list', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="autocomplete-opened"]',
        simulateSelector:
          '[data-visual-test="autocomplete-opened"] .focus-trigger .dnb-drawer-list:last-of-type li.first-of-type',
        simulate: 'click',
        style: {
          height: '40rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
