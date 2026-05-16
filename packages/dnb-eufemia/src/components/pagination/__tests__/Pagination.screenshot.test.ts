import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Pagination for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/pagination/demos/',
  })

  it('have to match the default pagination bar', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
    })
  })

  it('have to match the pagination with horizontal layout', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-horizontal"]',
      style: {
        width: '60rem',
      },
    })
  })

  it('have to match the current button hover', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--primary',
      simulate: 'hover',
    })
  })

  it('have to match the current button active', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--primary',
      simulate: 'active',
    })
  })

  it('have to match the current button focus', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--primary',
      simulate: 'focus',
    })
  })

  it('have to match unselected button hover', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--secondary',
      simulate: 'hover',
    })
  })

  it('have to match unselected button active', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--secondary',
      simulate: 'active',
    })
  })

  it('have to match unselected button focus', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] .dnb-button--secondary',
      simulate: 'focus',
    })
  })

  it('have to match pagination bar at page one', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] div.dnb-pagination__bar__inner button.dnb-pagination__button:first-of-type',
      simulate: 'click',
    })
  })

  it('have to match pagination bar at last page', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] div.dnb-pagination__bar__inner button.dnb-pagination__button:last-of-type',
      simulate: 'click',
    })
  })
})

describe.each(['ui', 'sbanken'])(`Pagination for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/pagination/demos/',
    pageViewport: {
      width: 500,
      height: 600,
    },
  })

  it('have to match the default pagination bar in small viewport', async () => {
    await makeScreenshot({
      pageViewport: {
        width: 500,
        height: 600,
      },
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '30rem',
      },
    })
  })
})
