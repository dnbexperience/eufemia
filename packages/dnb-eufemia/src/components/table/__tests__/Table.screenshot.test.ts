import { it, describe } from 'vitest'
import {
  isCI,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

const defaults = { wrapperStyle: { margin: '0 !important' } } // because of ScrollView overflow

describe.each(['ui', 'sbanken'])(`Table for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/table/demos/',
  })

  it('have to match the default choice of table styles', async () => {
    await makeScreenshot({
      ...defaults,
      style: {
        width: '30rem',
      },
      selector: '[data-visual-test="table-default"] .dnb-table',
    })
  })

  it('have to match a complex table layout', async () => {
    await makeScreenshot({
      ...defaults,
      style: {
        width: '50rem',
      },
      selector: '[data-visual-test="table-complex"] .dnb-table',
    })
  })

  it('have to match a row scope only table layout', async () => {
    await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-row-scope-only"] .dnb-table',
    })
  })

  it('have to match a fixed table layout', async () => {
    await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-fixed"]',
    })
  })

  it('have to match table container', async () => {
    await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-container"]',
    })
  })

  it('have to match table empty container head and foot', async () => {
    await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-container-empty"]',
    })
  })

  it('have to match table in medium size', async () => {
    await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-size-medium"]',
    })
  })

  it('have to match table in small size', async () => {
    await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-size-small"]',
    })
  })

  it('have to match header with wrapped text', async () => {
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
  it('have to match a sortable table header on focus', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    await makeScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'focus',
      ...defaults,
    })
  })

  it('have to match a sortable table header on active', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    await makeScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'active',
      ...defaults,
    })
  })

  it('have to match a active sortable table header on active state', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--active'
    await makeScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'active',
      ...defaults,
    })
  })

  it('have to match a sortable table header on hover', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    await makeScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'hover',
      ...defaults,
    })
  })

  it('have to match all combinations default', async () => {
    const selector = '[data-visual-test="table-combinations-default"]'
    await makeScreenshot({
      ...defaults,
      selector,
    })
  })

  it('have to match all combinations with no header', async () => {
    const selector = '[data-visual-test="table-combinations-no-header"]'
    await makeScreenshot({
      ...defaults,
      selector,
    })
  })

  it('have to match all combinations with row header', async () => {
    const selector = '[data-visual-test="table-combinations-row-header"]'
    await makeScreenshot({
      ...defaults,
      selector,
    })
  })

  it('have to match all combinations with spanning', async () => {
    const selector = '[data-visual-test="table-combinations-spanning"]'
    await makeScreenshot({
      ...defaults,
      selector,
    })
  })

  it('have to match all combinations with spanning row headers', async () => {
    const selector =
      '[data-visual-test="table-combinations-row-header-spanning"]'
    await makeScreenshot({
      ...defaults,
      selector,
    })
  })

  // This test is fragile and should re-load the page to not be influenced by other simulations
  if (!isCI) {
    describe('have to match', () => {
      setupPageScreenshot({
        themeName,
        url: '/uilib/components/table/demos/',
      })

      it('sticky header', async () => {
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

describe.each(['ui', 'sbanken'])(
  `Table with skeleton for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos/?skeleton',
    })

    it('have to match default table', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '40rem',
        },
        selector: '[data-visual-test="table-default"]',
      })
    })
  }
)

describe.each(['ui', 'sbanken'])(
  `Table with accordion for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos/',
    })

    it('have to match default state', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion"] .dnb-table',
      })
    })

    it('have to match hover state on first row', async () => {
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

    it('have to match hover state on last row', async () => {
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

    it('have to match focus state on last row', async () => {
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

    it('have to match active state on last row', async () => {
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

    it('have to match expanded state on first row', async () => {
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

    it('have to match default state when mixed(only a few TRs has accordionContent', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-mixed"] .dnb-table',
      })
    })
  }
)

describe.each(['ui', 'sbanken'])(
  `Table with accordion rows for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos/',
    })

    it('have to match default state', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"] .dnb-table',
      })
    })

    it('have to match hover state on first row', async () => {
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

    it('have to match hover state on last row', async () => {
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

    it('have to match focus state on last row', async () => {
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

    it('have to match active state on last row', async () => {
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

    it('have to match expanded state on first row', async () => {
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

    it('have to match table in accordion table', async () => {
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
  }
)

describe.each(['ui', 'sbanken'])(
  `Table with navigation for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos/',
    })

    it('have to match default state', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-navigation"] .dnb-table',
      })
    })

    it('have to match hover state on first row', async () => {
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

    it('have to match hover state on last row', async () => {
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

    it('have to match focus state on last row', async () => {
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

    it('have to match default state when mixed(only a few TRs has onClick', async () => {
      await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-navigation-mixed"] .dnb-table',
      })
    })

    it('have to match hover state on one clickable cell', async () => {
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
  }
)

describe('Table', () => {
  it('have to match table with one td', async () => {
    await makeScreenshot({
      ...defaults,
      pageViewport: {
        width: 300,
      },
      url: '/uilib/components/table/demos/',
      selector: '[data-visual-test="table-one-td"]',
    })
  })

  it('have to match table with one td on larger screens', async () => {
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

  it('have to match table in card', async () => {
    await makeScreenshot({
      ...defaults,
      style: {
        width: '40rem',
      },
      url: '/uilib/components/table/demos/',
      selector: '[data-visual-test="table-in-card"]',
    })
  })

  it('have to match column highlight', async () => {
    await makeScreenshot({
      ...defaults,
      style: {
        width: '40rem',
      },
      selector: '[data-visual-test="table-column-highlight"] .dnb-table',
    })
  })
})
