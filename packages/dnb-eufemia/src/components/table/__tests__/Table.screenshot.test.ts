/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  isCI,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

const defaults = { wrapperStyle: { margin: '0 !important' } } // because of ScrollView overflow

describe.each(['ui', 'sbanken'])('Table for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/table/demos',
  })

  it('have to match the default choice of table styles', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      style: {
        width: '30rem',
      },
      selector: '[data-visual-test="table-default"] .dnb-table',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a complex table layout', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      style: {
        width: '50rem',
      },
      selector: '[data-visual-test="table-complex"] .dnb-table',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a row scope only table layout', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-row-scope-only"] .dnb-table',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a fixed table layout', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-fixed"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table container', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-container"]',
      matchConfig: {
        failureThreshold: 0.21,
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table empty container head and foot', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-container-empty"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table in medium size', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-size-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table in small size', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="table-size-small"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match header with wrapped text', async () => {
    const selector = '[data-visual-test="table-header"] .dnb-table'
    const screenshot = await makeScreenshot({
      ...defaults,
      style: {
        width: '40rem',
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  // should be tested first from the other "simulate" tests
  it('have to match a sortable table header on focus', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    const screenshot = await makeScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'focus',
      ...defaults,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a sortable table header on active', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    const screenshot = await makeScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'active',
      ...defaults,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a active sortable table header on active state', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--active'
    const screenshot = await makeScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'active',
      ...defaults,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a sortable table header on hover', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    const screenshot = await makeScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'hover',
      ...defaults,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table without inner classes', async () => {
    const selector = '[data-visual-test="table-no-classes"]'
    const screenshot = await makeScreenshot({
      ...defaults,
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all combinations default', async () => {
    const selector = '[data-visual-test="table-combinations-default"]'
    const screenshot = await makeScreenshot({
      ...defaults,
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all combinations with no header', async () => {
    const selector = '[data-visual-test="table-combinations-no-header"]'
    const screenshot = await makeScreenshot({
      ...defaults,
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all combinations with row header', async () => {
    const selector = '[data-visual-test="table-combinations-row-header"]'
    const screenshot = await makeScreenshot({
      ...defaults,
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all combinations with spanning', async () => {
    const selector = '[data-visual-test="table-combinations-spanning"]'
    const screenshot = await makeScreenshot({
      ...defaults,
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match all combinations with spanning row headers', async () => {
    const selector =
      '[data-visual-test="table-combinations-row-header-spanning"]'
    const screenshot = await makeScreenshot({
      ...defaults,
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  // This test is fragile and should re-load the page to not be influenced by other simulations
  if (!isCI) {
    describe('have to match', () => {
      setupPageScreenshot({
        themeName,
        url: '/uilib/components/table/demos',
      })

      it('sticky header', async () => {
        const selector = '[data-visual-test="table-sticky"]'
        const screenshot = await makeScreenshot({
          ...defaults,
          style: {
            width: '30rem',
          },
          selector,
          waitAfterSimulate: 100, // same delay as the resize dispatch
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
        expect(screenshot).toMatchImageSnapshot()
      })
    })
  }
})

describe.each(['ui', 'sbanken'])(
  'Table with skeleton for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos?skeleton',
    })

    it('have to match default table', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '40rem',
        },
        selector: '[data-visual-test="table-default"]',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)

describe.each(['ui', 'sbanken'])(
  'Table with accordion for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos',
    })

    it('have to match default state', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion"] .dnb-table',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match hover state on first row', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match hover state on last row', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match focus state on last row', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match active state on last row', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match expanded state on first row', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match default state when mixed(only a few TRs has accordionContent', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-mixed"] .dnb-table',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)

describe.each(['ui', 'sbanken'])(
  'Table with accordion rows for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos',
    })

    it('have to match default state', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"] .dnb-table',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match hover state on first row', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"]',
        simulateSelector:
          '[data-visual-test="table-accordion-rows"] tbody .dnb-table__tr--clickable:first-child',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match hover state on last row', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"]',
        simulateSelector:
          '[data-visual-test="table-accordion-rows"] tbody .dnb-table__tr--clickable.dnb-table__tr--last',
        simulate: 'hover',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match focus state on last row', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"]',
        simulateSelector:
          '[data-visual-test="table-accordion-rows"] tbody .dnb-table__tr--clickable.dnb-table__tr--last',
        simulate: 'focus',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match active state on last row', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-accordion-rows"]',
        simulateSelector:
          '[data-visual-test="table-accordion-rows"] tbody .dnb-table__tr--clickable.dnb-table__tr--last',
        simulate: 'active',
        matchConfig: {
          failureThreshold: 0.01, // locally as well
        },
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match expanded state on first row', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)

describe.each(['ui', 'sbanken'])(
  'Table with navigation for %s',
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/table/demos',
    })

    it('have to match default state', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-navigation"] .dnb-table',
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match hover state on first row', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match hover state on last row', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match focus state on last row', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchImageSnapshot()
    })

    it('have to match default state when mixed(only a few TRs has onClick', async () => {
      const screenshot = await makeScreenshot({
        ...defaults,
        style: {
          width: '35rem',
        },
        selector: '[data-visual-test="table-navigation-mixed"] .dnb-table',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  }
)

describe('Table', () => {
  it('have to match table with one td', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      pageViewport: {
        width: 300,
      },
      url: '/uilib/components/table/demos',
      selector: '[data-visual-test="table-one-td"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table with one td on larger screens', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      pageViewport: {
        width: 800,
      },
      style: {
        width: '30rem',
      },
      url: '/uilib/components/table/demos',
      selector: '[data-visual-test="table-one-td"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
