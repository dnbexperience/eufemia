/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Accordion container screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion'
  })
  it('have to match accordion in desktop mode', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '40rem' },
      selector: '[data-visual-test="accordion-container"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Accordion container screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion',
    pageViewport: {
      width: 400,
      height: 600
    }
  })
  it('have to match accordion in mobile mode', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector: '[data-visual-test="accordion-container"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Accordion group screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/accordion' })
  it('have to match accordion in first state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem', height: '20rem' },
      selector: '[data-visual-test="accordion-group"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion in second state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem', height: '20rem' },
      selector: '[data-visual-test="accordion-group"]',
      simulateSelector:
        '[data-visual-test="accordion-group"] .dnb-accordion:first-of-type .dnb-accordion__header',
      simulate: 'click'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

// NB: Run the one we expand last

describe('Accordion closed screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/accordion'
  })
  it('have to match accordion in closed state', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '10rem' },
      selector: '[data-visual-test="accordion-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion in closed state with hover', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '10rem' },
      selector: '[data-visual-test="accordion-default"]',
      simulateSelector:
        '[data-visual-test="accordion-default"] .dnb-accordion__header',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion in closed state with focus', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="accordion-default"]',
      simulateSelector:
        '[data-visual-test="accordion-default"] .dnb-accordion__header',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match accordion in open state with focus', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '20rem', height: '20rem' },
      selector: '[data-visual-test="accordion-default"]',
      simulateSelector:
        '[data-visual-test="accordion-default"] .dnb-accordion__header',
      simulate: 'focusclick'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
