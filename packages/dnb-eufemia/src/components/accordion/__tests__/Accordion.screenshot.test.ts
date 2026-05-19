import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  `Accordion for %s`,
  (themeName) => {
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/accordion/demos/',
    })

    it('have to match in closed state', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-default"]',
      })
    })

    it('have to match in nested accordions', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-nested"]',
      })
    })

    it('have to match with large content', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-large"]',
      })
    })

    it('have to match in open state with focus', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="accordion-default"]',
        selector: '[data-visual-test="accordion-default"]',
        simulateSelector:
          '[data-visual-test="accordion-default"] .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
        simulate: 'focus',
      })
    })

    it('have to match in closed state with focus', async () => {
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

    it('have to match in closed state with hover', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        styleSelector: '[data-visual-test="accordion-default"]',
        selector: '[data-visual-test="accordion-default"]',
        simulate: 'hover',
        simulateSelector:
          '[data-visual-test="accordion-default"] .dnb-accordion-group .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
      })
    })

    it('have to match in first state', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="accordion-group"]',
      })
    })

    it('have to match in second state', async () => {
      await makeScreenshot({
        style: { width: '30rem' },
        selector: '[data-visual-test="accordion-group"]',
        recalculateHeightAfterSimulate: true,
        simulateSelector:
          '[data-visual-test="accordion-group"] .dnb-accordion:first-of-type .dnb-accordion__header',
        simulate: 'click',
      })
    })

    it('have to match with plain variant', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-variant-plain"]',
      })
    })

    it('have to match disabled state', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-disabled"]',
      })
    })

    it('have to match tertiary variant expanded', async () => {
      await makeScreenshot({
        style: { width: '20rem' },
        selector: '[data-visual-test="accordion-tertiary"]',
        recalculateHeightAfterSimulate: true,
        simulateSelector:
          '[data-visual-test="accordion-tertiary"] .dnb-accordion__tertiary-button',
        simulate: 'click',
      })
    })

    describe.each(['description', 'filled'])(`%s`, (testName) => {
      const style = { width: '20rem' }
      const selector = `[data-visual-test="accordion-${testName}"]`

      it('expanded and closed', async () => {
        await makeScreenshot({
          style,
          selector,
        })
      })

      describe('expanded', () => {
        const simulateSelector =
          selector +
          ' .dnb-accordion:nth-of-type(1) .dnb-accordion__header'

        it('hover', async () => {
          await makeScreenshot({
            style,
            selector,
            simulateSelector,
            simulate: 'hover',
          })
        })

        it('active', async () => {
          await makeScreenshot({
            style,
            selector,
            simulateSelector,
            simulate: 'active',
          })
        })

        it('focus', async () => {
          await makeScreenshot({
            style,
            selector,
            simulateSelector,
            simulate: 'focus',
          })
        })
      })

      describe('closed', () => {
        const simulateSelector =
          selector +
          ' .dnb-accordion:nth-of-type(2) .dnb-accordion__header'

        it('hover', async () => {
          await makeScreenshot({
            style,
            selector,
            simulateSelector,
            simulate: 'hover',
          })
        })

        it('active', async () => {
          await makeScreenshot({
            style,
            selector,
            simulateSelector,
            simulate: 'active',
          })
        })

        it('focus', async () => {
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
)
