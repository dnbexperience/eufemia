/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Input screenshot', () => {
  const style = {
    style: {
      width: '200px' // make sure our input gets an explicit width, because of mac/linux rendering differences
    },
    styleSelector: '[data-dnb-test="input-large"] .dnb-input__input'
  }
  setupPageScreenshot({ url: '/uilib/components/input' })
  it('have to match input with placeholder', async () => {
    const screenshot = await testPageScreenshot({
      ...style,
      selector: '[data-dnb-test="input-placeholder"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match disabled input', async () => {
    const screenshot = await testPageScreenshot({
      ...style,
      selector: '[data-dnb-test="input-disabled"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type', async () => {
    const screenshot = await testPageScreenshot({
      ...style,
      selector: '[data-dnb-test="input-search"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match stretched and large size', async () => {
    const screenshot = await testPageScreenshot({
      // make sure our input gets an explicit width, because of mac/linux rendering differences
      ...{ ...style, style: { width: '600px' } },
      selector: '[data-dnb-test="input-large"]',
      simulateSelector: '[data-dnb-test="input-large"] .dnb-input__input',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type with focus state', async () => {
    const screenshot = await testPageScreenshot({
      ...style,
      selector: '[data-dnb-test="input-search"]',
      simulateSelector: '[data-dnb-test="input-search"] input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
