/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Accordion for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/accordion/demos',
    each: true,
  })

  it('have to match in closed state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="accordion-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in nested accordions', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="accordion-nested"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with large content', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="accordion-large"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in open state with focus', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      styleSelector: '[data-visual-test="accordion-default"]',
      selector: '[data-visual-test="accordion-default"]',
      simulateSelector:
        '[data-visual-test="accordion-default"] .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in closed state with focus', async () => {
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
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in closed state with hover', async () => {
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
          action: 'hover',
          selector:
            '[data-visual-test="accordion-default"] .dnb-accordion-group .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
        },
      ],
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in first state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="accordion-group"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in second state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="accordion-group"]',
      recalculateHeightAfterSimulate: true,
      simulateSelector:
        '[data-visual-test="accordion-group"] .dnb-accordion:first-of-type .dnb-accordion__header',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with plain variant', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="accordion-variant-plain"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem' },
      selector: '[data-visual-test="accordion-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  describe.each(['description', 'filled'])('%s', (testName) => {
    const style = { width: '20rem' }
    const selector = `[data-visual-test="accordion-${testName}"]`

    it('expanded and closed', async () => {
      const screenshot = await makeScreenshot({
        style,
        selector,
      })
      expect(screenshot).toMatchImageSnapshot()
    })

    describe('expanded', () => {
      const simulateSelector =
        selector + ' .dnb-accordion:nth-of-type(1) .dnb-accordion__header'

      it('hover', async () => {
        const screenshot = await makeScreenshot({
          style,
          selector,
          simulateSelector,
          simulate: 'hover',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('active', async () => {
        const screenshot = await makeScreenshot({
          style,
          selector,
          simulateSelector,
          simulate: 'active',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('focus', async () => {
        const screenshot = await makeScreenshot({
          style,
          selector,
          simulateSelector,
          simulate: 'focus',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })

    describe('closed', () => {
      const simulateSelector =
        selector + ' .dnb-accordion:nth-of-type(2) .dnb-accordion__header'

      it('hover', async () => {
        const screenshot = await makeScreenshot({
          style,
          selector,
          simulateSelector,
          simulate: 'hover',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('active', async () => {
        const screenshot = await makeScreenshot({
          style,
          selector,
          simulateSelector,
          simulate: 'active',
        })
        expect(screenshot).toMatchImageSnapshot()
      })

      it('focus', async () => {
        const screenshot = await makeScreenshot({
          style,
          selector,
          simulateSelector,
          simulate: 'focus',
        })
        expect(screenshot).toMatchImageSnapshot()
      })
    })
  })
})
