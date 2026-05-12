import {
  test,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`Accordion for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/accordion/demos/',
    })

    test('have to match in closed state', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-default"]',
      })
    })

    test('have to match in nested accordions', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-nested"]',
      })
    })

    test('have to match with large content', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-large"]',
      })
    })

    test('have to match in open state with focus', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="accordion-default"]',
        selector: '[data-visual-test="accordion-default"]',
        simulateSelector:
          '[data-visual-test="accordion-default"] .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
        simulate: 'focus',
      })
    })

    test('have to match in closed state with focus', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="accordion-default"]',
        selector: '[data-visual-test="accordion-default"]',
        recalculateHeightAfterSimulate: true,
        simulate: [
          {
            action: 'click',
            selector:
              '[data-visual-test="accordion-default"] .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
          },
          {
            action: 'focus',
            selector:
              '[data-visual-test="accordion-default"] .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
          },
        ],
      })
    })

    test('have to match in closed state with hover', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="accordion-default"]',
        selector: '[data-visual-test="accordion-default"]',
        simulate: 'hover',
        simulateSelector:
          '[data-visual-test="accordion-default"] .dnb-accordion-group .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
      })
    })

    test('have to match in first state', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="accordion-group"]',
      })
    })

    test('have to match in second state', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="accordion-group"]',
        recalculateHeightAfterSimulate: true,
        simulateSelector:
          '[data-visual-test="accordion-group"] .dnb-accordion:first-of-type .dnb-accordion__header',
        simulate: 'click',
      })
    })

    test('have to match with plain variant', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-variant-plain"]',
      })
    })

    test('have to match disabled state', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-disabled"]',
      })
    })

    for (const testName of ['description', 'filled']) {
      test.describe(`${testName}`, () => {
        const style = { width: '20rem' }
        const selector = `[data-visual-test="accordion-${testName}"]`

        test('expanded and closed', async () => {
          await makeScreenshot({
            style,
            selector,
          })
        })

        test.describe('expanded', () => {
          const simulateSelector =
            selector +
            ' .dnb-accordion:nth-of-type(1) .dnb-accordion__header'

          test('hover', async () => {
            await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'hover',
            })
          })

          test('active', async () => {
            await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'active',
            })
          })

          test('focus', async () => {
            await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'focus',
            })
          })
        })

        test.describe('closed', () => {
          const simulateSelector =
            selector +
            ' .dnb-accordion:nth-of-type(2) .dnb-accordion__header'

          test('hover', async () => {
            await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'hover',
            })
          })

          test('active', async () => {
            await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'active',
            })
          })

          test('focus', async () => {
            await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'focus',
            })
          })
        })
      })
    }
  })
}
