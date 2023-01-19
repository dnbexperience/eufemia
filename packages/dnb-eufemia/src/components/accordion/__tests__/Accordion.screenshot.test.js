/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Accordion closed ', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion/demos',
  })

  it('have to match accordion in closed state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '15rem' },
      selector: '[data-visual-test="accordion-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match accordion in nested accordions', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '25rem' },
      selector: '[data-visual-test="accordion-nested"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match accordion with large content', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '13rem' },
      selector: '[data-visual-test="accordion-large"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Accordion closed ', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion/demos',
    reload: true,
  })

  it('have to match accordion in open state with focus', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '20rem' },
      styleSelector: '[data-visual-test="accordion-default"]',
      selector: '[data-visual-test="accordion-default"]',
      simulateSelector:
        '[data-visual-test="accordion-default"] .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match accordion in closed state with focus', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '20rem' },
      styleSelector: '[data-visual-test="accordion-default"]',
      selector: '[data-visual-test="accordion-default"]',
      simulateSelector:
        '[data-visual-test="accordion-default"] .dnb-accordion:nth-of-type(1) .dnb-accordion__header',
      simulate: 'clickfocus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match accordion in closed state with hover', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '15rem' },
      styleSelector: '[data-visual-test="accordion-default"]',
      selector: '[data-visual-test="accordion-default"]',
      simulateSelector:
        '[data-visual-test="accordion-default"] .dnb-accordion-group .dnb-accordion__header',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Accordion container ', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion/demos',
  })

  it('have to match accordion in desktop mode', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '40rem', 'min-height': '15rem' },
      selector: '[data-visual-test="accordion-container"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Accordion container ', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion/demos',
    pageViewport: {
      width: 400,
      height: 600,
    },
  })

  it('have to match accordion in mobile mode', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem', 'min-height': '15rem' },
      selector: '[data-visual-test="accordion-container"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Accordion group ', () => {
  setupPageScreenshot({ url: '/uilib/components/accordion/demos' })

  it('have to match accordion in first state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem', height: '20rem' },
      selector: '[data-visual-test="accordion-group"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match accordion in second state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem', height: '20rem' },
      selector: '[data-visual-test="accordion-group"]',
      simulateSelector:
        '[data-visual-test="accordion-group"] .dnb-accordion:first-of-type .dnb-accordion__header',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Accordion plain variant ', () => {
  setupPageScreenshot({ url: '/uilib/components/accordion/demos' })

  it('have to match with plain variant', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '15rem' },
      selector: '[data-visual-test="accordion-variant-plain"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
