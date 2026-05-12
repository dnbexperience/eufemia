import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Pagination for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/pagination/demos/',
    })

    test('have to match the default pagination bar', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
      })
    })

    test('have to match the pagination with horizontal layout', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="pagination-horizontal"]',
        style: {
          width: '60rem',
        },
      })
    })

    test('have to match the current button hover', async () => {
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

    test('have to match the current button active', async () => {
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

    test('have to match the current button focus', async () => {
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

    test('have to match unselected button hover', async () => {
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

    test('have to match unselected button active', async () => {
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

    test('have to match unselected button focus', async () => {
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

    test('have to match pagination bar at page one', async () => {
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

    test('have to match pagination bar at last page', async () => {
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
}

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Pagination for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/pagination/demos/',
      pageViewport: {
        width: 500,
        height: 600,
      },
    })

    test('have to match the default pagination bar in small viewport', async () => {
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
}
