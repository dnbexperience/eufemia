import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

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
      await makeScreenshot({
        selector: '[data-visual-test="autocomplete-drawer-search"]',
        simulateSelector:
          '[data-visual-test="autocomplete-drawer-search"] .dnb-autocomplete .dnb-input',
        simulate: 'click',
        style: {
          height: '30rem',
        },
      })
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
      await makeScreenshot({
        selector: '[data-visual-test="autocomplete-sizes"]',
      })
    })

    test('have to match custom input width', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="autocomplete-input-width"]',
      })
    })

    test('have to match autocomplete with drawer-button', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="autocomplete-drawer-button"] .dnb-autocomplete__inner',
      })
    })

    test('have to match the closed autocomplete', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="autocomplete-closed"] .dnb-autocomplete__inner',
      })
    })

    test('have to match autocomplete with suffix value', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="autocomplete-suffix"]',
        simulateSelector:
          '[data-visual-test="autocomplete-suffix"] .dnb-autocomplete .dnb-input',
        simulate: 'click',
        style: {
          height: '25rem',
        },
      })
    })

    test('have to match autocomplete with groups', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="autocomplete-groups"]',
        simulateSelector:
          '[data-visual-test="autocomplete-groups"] .dnb-autocomplete .dnb-input',
        simulate: 'click',
        style: {
          height: '29rem',
        },
        simulateAfter: { keypress: 'Escape' },
      })
    })

    test('have to match the status with status_state information', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="autocomplete-status-information"] .dnb-autocomplete__inner',
      })
    })

    test('have to match the status with status_state error', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="autocomplete-status-error"] .dnb-autocomplete__inner',
      })
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
      await makeScreenshot({
        selector: '[data-visual-test="autocomplete-suffix"]',
        style: {
          height: '4rem',
        },
      })
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
      await makeScreenshot({
        selector: '[data-visual-test="autocomplete-disabled"]',
      })
    })

    test('have to match disabled options', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="autocomplete-disabled-options"]',
        simulateSelector:
          '[data-visual-test="autocomplete-disabled-options"] .dnb-autocomplete .dnb-input',
        simulate: 'click',
        style: {
          height: '25rem',
        },
      })
    })

    test('have to match autocomplete opened list', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="autocomplete-opened"]',
        simulateSelector:
          '[data-visual-test="autocomplete-opened"] .focus-trigger .dnb-drawer-list:last-of-type li.first-of-type',
        simulate: 'click',
        style: {
          height: '40rem',
        },
      })
    })
  })
}
