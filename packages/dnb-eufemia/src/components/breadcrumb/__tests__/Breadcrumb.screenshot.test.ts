import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken']) {
  test.describe(`Breadcrumb for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/breadcrumb/demos/',
    })

    test('have to match Breadcrumb single', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="breadcrumb-single"] .dnb-breadcrumb',
      })
    })

    test('have to match Breadcrumb default', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
      })
    })

    test('have to match Breadcrumb with custom children', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-children"] .dnb-breadcrumb',
      })
    })

    test('have to match Breadcrumb collapse', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
      })
    })

    test('have to match Breadcrumb collapse opened', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb',
        simulateSelector:
          '[data-visual-test="breadcrumb-collapse"] .dnb-breadcrumb__toggle',
        recalculateHeightAfterSimulate: true,
        simulate: 'click',
      })
    })

    test('have to match Breadcrumb hover state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
        screenshotSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
        simulateSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
        simulate: 'hover',
      })
    })

    test('have to match Breadcrumb active state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
        screenshotSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
        simulateSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
        simulate: 'active',
      })
    })

    test('have to match Breadcrumb focus state', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
        screenshotSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb .dnb-breadcrumb__bar',
        simulateSelector:
          '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb__list .dnb-breadcrumb__item:nth-of-type(2) a',
        simulate: 'focus',
      })
    })

    test('have to match Breadcrumb multiple', async () => {
      await makeScreenshot({
        selector:
          '[data-visual-test="breadcrumb-multiple"] .dnb-breadcrumb',
      })
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
        await makeScreenshot({
          selector:
            '[data-visual-test="breadcrumb-default"] .dnb-breadcrumb',
        })
      })

      test('have to match Breadcrumb multiple', async () => {
        await makeScreenshot({
          selector:
            '[data-visual-test="breadcrumb-multiple"] .dnb-breadcrumb',
        })
      })
    })
  })
}
