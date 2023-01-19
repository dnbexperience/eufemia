/**
 * Screenshot Test
 *
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Pagination', () => {
  setupPageScreenshot({
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

  it('have to match pagination bar at page one', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '50rem',
      },
      simulateSelector:
        '[data-visual-test="pagination-default"] div.dnb-pagination__bar__inner button.dnb-pagination__button:first-of-type',
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
        '[data-visual-test="pagination-default"] div.dnb-pagination__bar__inner button.dnb-pagination__button:last-of-type',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Pagination', () => {
  setupPageScreenshot({
    url: '/uilib/components/pagination/demos',
    pageViewport: {
      width: 500,
      height: 600,
    },
  })

  it('have to match the default pagination bar in small viewport', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="pagination-default"]',
      style: {
        width: '30rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
