/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Input', () => {
  const extend = (selector) => ({
    style: {
      width: '200px', // make sure our input gets an explicit width, because of mac/linux rendering differences
    },
    styleSelector: `[data-visual-test="${selector}"] .dnb-input__input`,
    simulateSelector: `[data-visual-test="${selector}"] .dnb-input__input`,
  })
  setupPageScreenshot({ url: '/uilib/components/input/demos' })

  it('have to match input with placeholder', async () => {
    const screenshot = await makeScreenshot({
      ...extend('input-placeholder'),
      selector: '[data-visual-test="input-placeholder"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match input with icon', async () => {
    const screenshot = await makeScreenshot({
      ...extend('input-icon'),
      selector: '[data-visual-test="input-icon"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled input', async () => {
    const screenshot = await makeScreenshot({
      ...extend('input-disabled'),
      selector: '[data-visual-test="input-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match search type', async () => {
    const screenshot = await makeScreenshot({
      ...extend('input-search'),
      selector: '[data-visual-test="input-search"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match search type with focus state', async () => {
    const screenshot = await makeScreenshot({
      ...extend('input-search'),
      selector: '[data-visual-test="input-search"]',
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match stretched and medium size', async () => {
    const screenshot = await makeScreenshot({
      ...{ ...extend('input-medium'), style: { width: '300px' } },
      selector: '[data-visual-test="input-medium"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match stretched input with status', async () => {
    const screenshot = await makeScreenshot({
      ...{ ...extend('input-stretch'), style: { width: '300px' } },
      selector: '[data-visual-test="input-stretch"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match error state', async () => {
    const screenshot = await makeScreenshot({
      ...extend('input-error'),
      selector: '[data-visual-test="input-error"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match input with clear button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="input-clear"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match input with clear button in hover state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="input-clear"]',
      simulateSelector:
        '[data-visual-test="input-clear"] .dnb-input:nth-of-type(3) .dnb-input__clear-button',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match password input', async () => {
    const screenshot = await makeScreenshot({
      ...extend('input-password'),
      selector: '[data-visual-test="input-password"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match text align with icon', async () => {
    const screenshot = await makeScreenshot({
      ...extend('input-align'),
      selector: '[data-visual-test="input-align"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
