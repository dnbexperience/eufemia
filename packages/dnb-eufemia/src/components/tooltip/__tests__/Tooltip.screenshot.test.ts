/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

const style = {
  padding: '1rem',
  'padding-top': '2rem',
}

describe.each(['ui', 'sbanken'])('Tooltip for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/tooltip/demos',
  })

  it('should match tooltip on button hover state', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="tooltip-hover"]',
      simulateSelector: '[data-visual-test="tooltip-hover"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state with long tooltip text', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="tooltip-hover-button-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-button-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align left', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-left': '2rem' },
      selector: '[data-visual-test="tooltip-hover-align-left"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-left"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align left with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-left': '6rem' },
      selector: '[data-visual-test="tooltip-hover-align-left-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-left-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align left and arrow left', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="tooltip-hover-align-arrow-left"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-arrow-left"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align left and arrow left with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-right': '12rem' },
      selector:
        '[data-visual-test="tooltip-hover-align-arrow-left-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-arrow-left-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align right and arrow right', async () => {
    const screenshot = await makeScreenshot({
      style: style,
      selector: '[data-visual-test="tooltip-hover-align-arrow-right"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-arrow-right"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align right and arrow right with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-left': '12rem' },
      selector:
        '[data-visual-test="tooltip-hover-align-arrow-right-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-arrow-right-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align left and arrow right', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-left': '6rem' },
      selector:
        '[data-visual-test="tooltip-hover-align-left-arrow-right"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-left-arrow-right"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align left and arrow right with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-left': '12rem' },
      selector:
        '[data-visual-test="tooltip-hover-align-left-arrow-right-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-left-arrow-right-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align right and arrow left', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-right': '6rem' },
      selector:
        '[data-visual-test="tooltip-hover-align-right-arrow-left"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-right-arrow-left"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align right and arrow left with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-right': '12rem' },
      selector:
        '[data-visual-test="tooltip-hover-align-right-arrow-left-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-right-arrow-left-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align right', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-right': '3rem' },
      selector: '[data-visual-test="tooltip-hover-align-right"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-right"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align center and arrow center', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="tooltip-hover-align-center"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-center"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when align center and arrow center with long text', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector:
        '[data-visual-test="tooltip-hover-align-center-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-center-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when arrow left', async () => {
    const screenshot = await makeScreenshot({
      style: style,
      selector: '[data-visual-test="tooltip-hover-arrow-left"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-arrow-left"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when arrow left with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-right': '12rem' },
      selector: '[data-visual-test="tooltip-hover-arrow-left-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-arrow-left-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when arrow right', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="tooltip-hover-arrow-right"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-arrow-right"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when arrow right with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-left': '6rem', 'padding-right': '6rem' },
      selector: '[data-visual-test="tooltip-hover-arrow-right-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-arrow-right-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when position right', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-right': '6rem' },
      selector: '[data-visual-test="tooltip-hover-position-right"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-position-right"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when position left', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-left': '6rem' },
      selector: '[data-visual-test="tooltip-hover-position-left"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-position-left"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when position left with long text', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector:
        '[data-visual-test="tooltip-hover-position-left-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-position-left-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when position bottom', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-top': '0', 'padding-bottom': '2rem' },
      selector: '[data-visual-test="tooltip-hover-position-bottom"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-position-bottom"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when position bottom with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-top': '0', 'padding-bottom': '2rem' },
      selector:
        '[data-visual-test="tooltip-hover-position-bottom-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-position-bottom-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip in large size', async () => {
    const screenshot = await makeScreenshot({
      style: {
        height: '5rem',
        padding: '3rem 0 0 2rem',
      },
      selector: '[data-visual-test="tooltip-large"]',
      simulateSelector: '[data-visual-test="tooltip-large"] .dnb-span',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])('Tooltip for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/tooltip/demos',
  })

  it('should match tooltip on button hover state when align right with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-right': '12rem', 'padding-bottom': '0' },
      selector: '[data-visual-test="tooltip-hover-align-right-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-align-right-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should match tooltip on button hover state when position right with long text', async () => {
    const screenshot = await makeScreenshot({
      style: { ...style, 'padding-right': '12rem' },
      selector:
        '[data-visual-test="tooltip-hover-position-right-long-text"]',
      simulateSelector:
        '[data-visual-test="tooltip-hover-position-right-long-text"] button',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
