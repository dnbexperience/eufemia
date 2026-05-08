import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Breadcrumb for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/breadcrumb/demos/',
    })

    test('have to match Breadcrumb single', async () => {
      const screenshot = await makeScreenshot({
        selector: '[data-visual-test="breadcrumb-single"] .dnb-breadcrumb',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match Breadcrumb default', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match Breadcrumb with custom children', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-children"] .dnb-breadcrumb',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match Breadcrumb collapse', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match Breadcrumb collapse opened', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
        simulateSelector:
          '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb__toggle',
        recalculateHeightAfterSimulate: true,
        simulate: 'click',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match Breadcrumb hover state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
        screenshotSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
        simulateSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
        simulate: 'hover',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match Breadcrumb active state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
        screenshotSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
        simulateSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
        simulate: 'active',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match Breadcrumb focus state', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
        screenshotSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
        simulateSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match Breadcrumb multiple', async () => {
      const screenshot = await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-multiple"] .dnb-breadcrumb',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test.describe('on small screen', () => {
      setupPageScreenshot({
        url: '/uilib/components/breadcrumb/demos/',
        themeName,
        pageViewport: {
          width: 700,
        },
      })

      test('have to match Breadcrumb default', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
        })
        expect(screenshot).toMatchSnapshot()
      })

      test('have to match Breadcrumb multiple', async () => {
        const screenshot = await makeScreenshot({
          selector:
            '[data-visual-test="breadcrumb-multiple"] .dnb-breadcrumb',
        })
        expect(screenshot).toMatchSnapshot()
      })
    })
  })
}
