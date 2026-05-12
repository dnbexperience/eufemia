import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Pagination for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/pagination/demos/',
    })

    test('have to match the default pagination bar', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the pagination with horizontal layout', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-horizontal"]',
        style: {
          width: '60rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the current button hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-default"] .dnb-button--primary',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the current button active', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-default"] .dnb-button--primary',
        simulate: 'active',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match the current button focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-default"] .dnb-button--primary',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match unselected button hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-default"] .dnb-button--secondary',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match unselected button active', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-default"] .dnb-button--secondary',
        simulate: 'active',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match unselected button focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-default"] .dnb-button--secondary',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match pagination bar at page one', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-default"] div.dnb-pagination__bar__inner button.dnb-pagination__button:first-of-type',
        simulate: 'click',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match pagination bar at last page', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-default"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-default"] div.dnb-pagination__bar__inner button.dnb-pagination__button:last-of-type',
        simulate: 'click',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match pagination with href', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-href"]',
        style: {
          width: '50rem',
        },
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match pagination with href link hover', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-href"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-href"] a.dnb-pagination__button:nth-of-type(2)',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match pagination with href link focus', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-href"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-href"] a.dnb-pagination__button:nth-of-type(2)',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match pagination with href current page', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="pagination-href"]',
        style: {
          width: '50rem',
        },
        simulateSelector:
          '[data-visual-test="pagination-href"] a.dnb-pagination__button--current',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
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
      expect(screenshot).toMatchSnapshot()
    })
  })
}
