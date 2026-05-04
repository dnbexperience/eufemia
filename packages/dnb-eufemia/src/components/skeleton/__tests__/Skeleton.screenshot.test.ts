import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Skeleton for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/skeleton/demos/',
    })

    test('have to match skeleton article figure', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem', height: '20rem' },
        selector: '[data-visual-test="skeleton-figure-article"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match excluded components', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem', height: '20rem' },
        selector: '[data-visual-test="skeleton-exclude"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match a removed skeleton', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem', height: '20rem' },
        selector: '[data-visual-test="skeleton-exclude"]',
        simulateSelector:
          '[data-visual-test="skeleton-exclude"] .dnb-button',
        simulate: 'click',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match all components - vertical', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="skeleton-all-vertical"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match all components - horizontal', async () => {
      const screenshot = await makeScreenshot({
        addWrapper: false,
        style: {
          width: '60rem',
          overflow: 'visible',
          padding: '0', // Reset existing styles
          'white-space': 'initial', // Reset existing styles
        },
        selector:
          '[data-visual-test="skeleton-all-horizontal"] .dnb-flex-container',
      })
      expect(screenshot).toMatchSnapshot()
    })
  })
}
