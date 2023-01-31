/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Accordion', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion/demos',
  })

  it('have to match in closed state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '15rem' },
      selector: '[data-visual-test="accordion-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in nested accordions', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '25rem' },
      selector: '[data-visual-test="accordion-nested"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with large content', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '13rem' },
      selector: '[data-visual-test="accordion-large"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in open state with focus', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '20rem' },
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
      style: { width: '20rem', height: '20rem' },
      styleSelector: '[data-visual-test="accordion-default"]',
      selector: '[data-visual-test="accordion-default"]',
      simulateSelector:
        '[data-visual-test="accordion-default"] .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
      simulate: 'clickfocus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in closed state with hover', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '15rem' },
      styleSelector: '[data-visual-test="accordion-default"]',
      selector: '[data-visual-test="accordion-default"]',
      simulateSelector:
        '[data-visual-test="accordion-default"] .dnb-accordion-group .dnb-accordion__header',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in desktop mode', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '40rem', 'min-height': '15rem' },
      selector: '[data-visual-test="accordion-container"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in first state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem', height: '20rem' },
      selector: '[data-visual-test="accordion-group"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match in second state', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '30rem', height: '20rem' },
      selector: '[data-visual-test="accordion-group"]',
      simulateSelector:
        '[data-visual-test="accordion-group"] .dnb-accordion:first-of-type .dnb-accordion__header',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match with plain variant', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '20rem', height: '15rem' },
      selector: '[data-visual-test="accordion-variant-plain"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Accordion container', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion/demos',
    pageViewport: {
      width: 400,
      height: 600,
    },
  })

  it('have to match in mobile mode', async () => {
    const screenshot = await makeScreenshot({
      style: { width: '22rem', 'min-height': '15rem' },
      selector: '[data-visual-test="accordion-container"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
