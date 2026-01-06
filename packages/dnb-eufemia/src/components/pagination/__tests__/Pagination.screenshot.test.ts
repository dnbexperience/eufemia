/**
 * Screenshot Test
 *
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Pagination for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/pagination/demos',
  })

  it('have to match the default pagination bar', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the pagination with horizontal layout', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-horizontal"]',
      style: {
        width: '60rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the current button hover', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--primary',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the current button active', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--primary',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the current button focus', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--primary',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match unselected button hover', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--secondary',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match unselected button active', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--secondary',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match unselected button focus', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--secondary',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match pagination bar at page one', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] div.dnb-pagination__bar-inner button.dnb-pagination__button:first-of-type',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match pagination bar at last page', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] div.dnb-pagination__bar-inner button.dnb-pagination__button:last-of-type',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])('Pagination for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/pagination/demos',
    pageViewport: {
      width: 500,
      height: 600,
    },
  })

  it('have to match the default pagination bar in small viewport', async () => {
    const screenshot = await makeScreenshot({
      pageViewport: {
        width: 500,
        height: 600,
      },
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '30rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
