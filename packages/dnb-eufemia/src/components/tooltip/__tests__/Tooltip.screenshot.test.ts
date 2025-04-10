/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Tooltip for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/tooltip/demos',
  })

  it('have to match tooltip on button hover state', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '4rem',
        'padding-top': '2rem',
      },
      selector: '[data-visual-test="tooltip-hover"]',
      simulateSelector: '[data-visual-test="tooltip-hover"] button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip on button hover state with long tooltip text', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '4rem',
        'padding-top': '2rem',
      },
      selector: '[data-visual-test="tooltip-hover-button-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-button-long-text"] button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip on button hover state when align left', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '4rem',
        'padding-top': '2rem',
      },
      selector: '[data-visual-test="tooltip-hover-align-left"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-left"] button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip on button hover state when align right', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '4rem',
        'padding-top': '2rem',
      },
      selector: '[data-visual-test="tooltip-hover-align-right"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-right"] button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip on button hover state when arrow left', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '4rem',
        'padding-top': '2rem',
      },
      selector: '[data-visual-test="tooltip-hover-arrow-left"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-arrow-left"] button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip on button hover state when arrow right', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '4rem',
        'padding-top': '2rem',
      },
      selector: '[data-visual-test="tooltip-hover-arrow-right"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-arrow-right"] button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip on button hover state when position right', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '4rem',
        'padding-right': '2rem',
      },
      selector: '[data-visual-test="tooltip-hover-position-right"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-position-right"] button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip on button hover state when position bottom', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '4rem',
        'padding-bottom': '2rem',
      },
      selector: '[data-visual-test="tooltip-hover-position-bottom"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-position-bottom"] button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tooltip in large size', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '5rem',
        padding: '3rem 0 0 2rem',
      },
      selector: '[data-visual-test="tooltip-large"]',
      simulateSelector:
        '[data-visual-test="tooltip-large"] .dnb-span:nth-of-type(1)',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
