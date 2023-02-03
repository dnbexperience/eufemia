/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Table screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/table/demos' })

  it('have to match the default choice of table styles', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '30rem',
      },
      selector: '[data-visual-test="table-default"] .dnb-table',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a complex table layout', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '50rem',
      },
      selector: '[data-visual-test="table-complex"] .dnb-table',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a row scope only table layout', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="table-row-scope-only"] .dnb-table',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a fixed table layout', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="table-fixed"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table container', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="table-container"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table empty container head and foot', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="table-container-empty"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table in medium size', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="table-size-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match table in small size', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="table-size-small"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match header with wrapped text', async () => {
    const selector = '[data-visual-test="table-header"] .dnb-table'
    const screenshot = await testPageScreenshot({
      style: {
        width: '40rem',
      },
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match sticky header', async () => {
    const selector = '[data-visual-test="table-sticky"]'
    const screenshot = await testPageScreenshot({
      style: {
        width: '30rem',
      },
      selector,
      executeBeforeSimulate: () => {
        document
          .querySelector(
            '[data-visual-test="table-sticky"] table tbody tr:nth-of-type(5)'
          )
          .scrollIntoView({
            behavior: 'auto',
          })
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Table screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/table/demos' })

  // should be tested first
  it('have to match a sortable table header on focus', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    const screenshot = await testPageScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'focus',
      wrapperStyle: { margin: 0 }, // will only add a padding, but avoid a negative margin
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a sortable table header on active', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    const screenshot = await testPageScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'active',
      wrapperStyle: { margin: 0 }, // will only add a padding, but avoid a negative margin
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a active sortable table header on active state', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--active'
    const screenshot = await testPageScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'active',
      wrapperStyle: { margin: 0 }, // will only add a padding, but avoid a negative margin
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a sortable table header on hover', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    const screenshot = await testPageScreenshot({
      selector,
      simulateSelector: `${selector} .dnb-button`,
      simulate: 'hover',
      wrapperStyle: { margin: '0 2rem 0 0' }, // will only add a padding, but avoid a negative margin
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Table with skeleton screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/table/demos?skeleton' })

  it('have to match default table', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '40rem',
      },
      selector: '[data-visual-test="table-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Table with accordion screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/table' })

  it('have to match default state', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '35rem',
      },
      selector: '[data-visual-test="table-accordion"] .dnb-table',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match hover state on first row', async () => {
    const screenshot = await testPageScreenshot({
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
    const screenshot = await testPageScreenshot({
      style: {
        width: '35rem',
      },
      selector:
        '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type',
      simulateSelector:
        '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type tbody tr:nth-last-child(2)',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match focus state on last row', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '35rem',
      },
      selector:
        '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type',
      simulateSelector:
        '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type tbody tr:nth-last-child(2)',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match active state on last row', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '35rem',
      },
      selector:
        '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type',
      simulateSelector:
        '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type tbody tr:nth-last-child(2)',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match expanded state on first row', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '35rem',
        height: '20rem',
      },
      selector:
        '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type',
      simulateSelector:
        '[data-visual-test="table-accordion"] .dnb-scroll-view:last-of-type tbody tr:first-of-type',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
