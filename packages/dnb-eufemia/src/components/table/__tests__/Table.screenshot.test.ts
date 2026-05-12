import {
  test,
  isCI,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

const defaults = { wrapperStyle: { margin: '0 !important' } } // because of ScrollView overflow

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Table for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos/',
    })

    test('have to match the default choice of table styles', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '30rem',
        },
        selector: '[data-visual-test="table-default"] .dnb-table',
      })
    })

    test('have to match a complex table layout', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '50rem',
        },
        selector: '[data-visual-test="table-complex"] .dnb-table',
      })
    })

    test('have to match a row scope only table layout', async () => {
      await makeScreenshot({
        ...defaults,
        selector: '[data-visual-test="table-row-scope-only"] .dnb-table',
      })
    })

    test('have to match a fixed table layout', async () => {
      await makeScreenshot({
        ...defaults,
        selector: '[data-visual-test="table-fixed"]',
      })
    })

    test('have to match table container', async () => {
      await makeScreenshot({
        ...defaults,
        selector: '[data-visual-test="table-container"]',
      })
    })

    test('have to match table empty container head and foot', async () => {
      await makeScreenshot({
        ...defaults,
        selector: '[data-visual-test="table-container-empty"]',
      })
    })

    test('have to match table in medium size', async () => {
      await makeScreenshot({
        ...defaults,
        selector: '[data-visual-test="table-size-medium"]',
      })
    })

    test('have to match table in small size', async () => {
      await makeScreenshot({
        ...defaults,
        selector: '[data-visual-test="table-size-small"]',
      })
    })

    test('have to match header with wrapped text', async () => {
      const selector = '[data-visual-test="table-header"] .dnb-table'
      await makeScreenshot({
        ...defaults,
        style: {
          width: '40rem',
        },
        selector,
      })
    })

    // should be tested first from the other "simulate" tests
    test('have to match a sortable table header on focus', async () => {
      const selector =
        '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
      await makeScreenshot({
        selector,
        simulateSelector: `${selector} .dnb-button`,
        simulate: 'focus',
        ...defaults,
      })
    })

    test('have to match a sortable table header on active', async () => {
      const selector =
        '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
      await makeScreenshot({
        selector,
        simulateSelector: `${selector} .dnb-button`,
        simulate: 'active',
        ...defaults,
      })
    })

    test('have to match a active sortable table header on active state', async () => {
      const selector =
        '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--active'
      await makeScreenshot({
        selector,
        simulateSelector: `${selector} .dnb-button`,
        simulate: 'active',
        ...defaults,
      })
    })

    test('have to match a sortable table header on hover', async () => {
      const selector =
        '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
      await makeScreenshot({
        selector,
        simulateSelector: `${selector} .dnb-button`,
        simulate: 'hover',
        ...defaults,
      })
    })

    test('have to match table without inner classes', async () => {
      const selector = '[data-visual-test="table-no-classes"]'
      await makeScreenshot({
        ...defaults,
        selector,
      })
    })

    test('have to match all combinations default', async () => {
      const selector = '[data-visual-test="table-combinations-default"]'
      await makeScreenshot({
        ...defaults,
        selector,
      })
    })

    test('have to match all combinations with no header', async () => {
      const selector = '[data-visual-test="table-combinations-no-header"]'
      await makeScreenshot({
        ...defaults,
        selector,
      })
    })

    test('have to match all combinations with row header', async () => {
      const selector = '[data-visual-test="table-combinations-row-header"]'
      await makeScreenshot({
        ...defaults,
        selector,
      })
    })

    test('have to match all combinations with spanning', async () => {
      const selector = '[data-visual-test="table-combinations-spanning"]'
      await makeScreenshot({
        ...defaults,
        selector,
      })
    })

    test('have to match all combinations with spanning row headers', async () => {
      const selector =
        '[data-visual-test="table-combinations-row-header-spanning"]'
      await makeScreenshot({
        ...defaults,
        selector,
      })
    })

    // This test is fragile and should re-load the page to not be influenced by other simulations
    if (!isCI) {
      test.describe('have to match', () => {
        setupPageScreenshot({
          themeName,
          url: '/uilib/components/table/demos/',
        })

        test('sticky header', async () => {
          const selector = '[data-visual-test="table-sticky"]'
          await makeScreenshot({
            ...defaults,
            style: {
              width: '30rem',
            },
            selector,
            executeBeforeSimulate: () => {
              const element = document.querySelector(
                '[data-visual-test="table-sticky"] table tbody tr:nth-of-type(5)'
              )
              element.scrollIntoView({
                behavior: 'auto',
              })

              // Ensure the window.resize event gets triggered in order to force the shadow to appear (after React v18 upgrade)
              setTimeout(
                () => window.dispatchEvent(new Event('resize')),
                100
              ) // A needed delay in order to activate the resize simulation
            },
          })
        })
      })
    }
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Table with skeleton for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos/?skeleton',
    })

    test('have to match default table', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '40rem',
        },
        selector: '[data-visual-test="table-default"]',
      })
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Table with accordion for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos/',
    })

    test('have to match default state', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion"] .dnb-table',
      })
    })

    test('have to match hover state on first row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type',
        simulateSelector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type tbody tr:first-of-type',
        simulate: 'hover',
      })
    })

    test('have to match hover state on last row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type',
        simulateSelector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type tbody .dnb-table__tr--last',
        simulate: 'hover',
      })
    })

    test('have to match focus state on last row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type',
        simulateSelector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type tbody .dnb-table__tr--last',
        simulate: 'focus',
      })
    })

    test('have to match active state on last row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type',
        simulateSelector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type tbody .dnb-table__tr--last',
        simulate: 'active',
      })
    })

    test('have to match expanded state on first row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        recalculateHeightAfterSimulate: true,
        selector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type',
        simulateSelector:
          '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type tbody tr:first-of-type',
        simulate: 'click',
      })
    })

    test('have to match default state when mixed(only a few TRs has accordionContent', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-mixed"] .dnb-table',
      })
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Table with accordion rows for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos/',
    })

    test('have to match default state', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"] .dnb-table',
      })
    })

    test('have to match hover state on first row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"]',
        simulateSelector:
          '[data-visual-test="table-accordion-rows"] tbody .dnb-table__tr--clickable:first-child',
        simulate: 'hover',
      })
    })

    test('have to match hover state on last row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"]',
        simulateSelector:
          '[data-visual-test="table-accordion-rows"] tbody .dnb-table__tr--clickable.dnb-table__tr--last',
        simulate: 'hover',
      })
    })

    test('have to match focus state on last row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"]',
        simulateSelector:
          '[data-visual-test="table-accordion-rows"] tbody .dnb-table__tr--clickable.dnb-table__tr--last',
        simulate: 'focus',
      })
    })

    test('have to match active state on last row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"]',
        simulateSelector:
          '[data-visual-test="table-accordion-rows"] tbody .dnb-table__tr--clickable.dnb-table__tr--last',
        simulate: 'active',
      })
    })

    test('have to match expanded state on first row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        recalculateHeightAfterSimulate: true,
        selector: '[data-visual-test="table-accordion-rows"]',
        simulate: [
          {
            action: 'click',
            selector:
              '[data-visual-test="table-accordion-rows"] tbody .dnb-table__tr--clickable:first-child',
          },
        ],
      })
    })

    test('have to match table in accordion table', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-inside-of-accordion-table"]',
        simulate: [
          {
            action: 'click',
            selector:
              '[data-visual-test="table-inside-of-accordion-table"] .dnb-table__td__button-icon',
          },
        ],
        recalculateHeightAfterSimulate: true,
      })
    })
  })
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Table with navigation for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos/',
    })

    test('have to match default state', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-navigation"] .dnb-table',
      })
    })

    test('have to match hover state on first row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector:
          '[data-visual-test="table-navigation"] .dnb-scroll-view:last-of-type',
        simulateSelector:
          '[data-visual-test="table-navigation"] .dnb-scroll-view:last-of-type tbody tr:first-of-type',
        simulate: 'hover',
      })
    })

    test('have to match hover state on last row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector:
          '[data-visual-test="table-navigation"] .dnb-scroll-view:last-of-type',
        simulateSelector:
          '[data-visual-test="table-navigation"] .dnb-scroll-view:last-of-type tbody .dnb-table__tr--last',
        simulate: 'hover',
      })
    })

    test('have to match focus state on last row', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector:
          '[data-visual-test="table-navigation"] .dnb-scroll-view:last-of-type',
        simulateSelector:
          '[data-visual-test="table-navigation"] .dnb-scroll-view:last-of-type tbody .dnb-table__tr--last',
        simulate: 'focus',
      })
    })

    test('have to match default state when mixed(only a few TRs has onClick', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-navigation-mixed"] .dnb-table',
      })
    })

    test('have to match hover state on one clickable cell', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-navigation-cell"] .dnb-table',
        simulateSelector:
          '[data-visual-test="table-navigation-cell"] tbody tr:first-of-type td:first-of-type .dnb-table__td__button',
        simulate: 'hover',
      })
    })
  })
}

test.describe('Table', () => {
  test('have to match table with one td', async () => {
    await makeScreenshot({
      ...defaults,
      pageViewport: {
        width: 300,
      },
      url: '/uilib/components/table/demos/',
      selector: '[data-visual-test="table-one-td"]',
    })
  })

  test('have to match table with one td on larger screens', async () => {
    await makeScreenshot({
      ...defaults,
      pageViewport: {
        width: 800,
      },
      style: {
        width: '30rem',
      },
      url: '/uilib/components/table/demos/',
      selector: '[data-visual-test="table-one-td"]',
    })
  })

  test('have to match table in card', async () => {
    await makeScreenshot({
      ...defaults,
      style: {
        width: '40rem',
      },
      url: '/uilib/components/table/demos/',
      selector: '[data-visual-test="table-in-card"]',
    })
  })

  test('have to match column highlight', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      style: {
        width: '40rem',
      },
      selector: '[data-visual-test="table-column-highlight"] .dnb-table',
    })
    expect(screenshot).toMatchSnapshot()
  })
})
