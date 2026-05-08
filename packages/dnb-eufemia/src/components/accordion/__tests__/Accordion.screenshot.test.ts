import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

for (const themeName of ['ui', 'sbanken', 'carnegie']) {
  test.describe(`Accordion for ${themeName}`, () => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/accordion/demos/',
    })

    test('have to match in closed state', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-default"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match in nested accordions', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-nested"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with large content', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-large"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match in open state with focus', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="accordion-default"]',
        selector: '[data-visual-test="accordion-default"]',
        simulateSelector:
          '[data-visual-test="accordion-default"] .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
        simulate: 'focus',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match in closed state with focus', async () => {
      const screenshot = await makeScreenshot({
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
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match in closed state with hover', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="accordion-default"]',
        selector: '[data-visual-test="accordion-default"]',
        simulate: 'hover',
        simulateSelector:
          '[data-visual-test="accordion-default"] .dnb-accordion-group .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match in first state', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="accordion-group"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match in second state', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="accordion-group"]',
        recalculateHeightAfterSimulate: true,
        simulateSelector:
          '[data-visual-test="accordion-group"] .dnb-accordion:first-of-type .dnb-accordion__header',
        simulate: 'click',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match with plain variant', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-variant-plain"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    test('have to match disabled state', async () => {
      const screenshot = await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-disabled"]',
      })
      expect(screenshot).toMatchSnapshot()
    })

    for (const testName of ['description', 'filled']) {
      test.describe(`${testName}`, () => {
        const style = { width: '20rem' }
        const selector = `[data-visual-test="accordion-${testName}"]`

        test('expanded and closed', async () => {
          const screenshot = await makeScreenshot({
            style,
            selector,
          })
          expect(screenshot).toMatchSnapshot()
        })

        test.describe('expanded', () => {
          const simulateSelector =
            selector +
            ' .dnb-accordion:nth-of-type(1) .dnb-accordion__header'

          test('hover', async () => {
            const screenshot = await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'hover',
            })
            expect(screenshot).toMatchSnapshot()
          })

          test('active', async () => {
            const screenshot = await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'active',
            })
            expect(screenshot).toMatchSnapshot()
          })

          test('focus', async () => {
            const screenshot = await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'focus',
            })
            expect(screenshot).toMatchSnapshot()
          })
        })

        test.describe('closed', () => {
          const simulateSelector =
            selector +
            ' .dnb-accordion:nth-of-type(2) .dnb-accordion__header'

          test('hover', async () => {
            const screenshot = await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'hover',
            })
            expect(screenshot).toMatchSnapshot()
          })

          test('active', async () => {
            const screenshot = await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'active',
            })
            expect(screenshot).toMatchSnapshot()
          })

          test('focus', async () => {
            const screenshot = await makeScreenshot({
              style,
              selector,
              simulateSelector,
              simulate: 'focus',
            })
            expect(screenshot).toMatchSnapshot()
          })
        })
      })
    }
  })
}
