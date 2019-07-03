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
    width: '200px' // make sure our input gets an explicit width, because of mac/linux rendering differences
  }
  setupPageScreenshot({ url: '/uilib/components/input' })
  it('have to match input with placeholder', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="input-placeholder"] .dnb-input'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match disabled input', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="input-disabled"] .dnb-input'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="input-search"] .dnb-input'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match stretched and large size', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '600px' // make sure our input gets an explicit width, because of mac/linux rendering differences
      },
      selector: '[data-dnb-test="input-large"] .dnb-input'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type with focus state', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="input-search"] .dnb-input',
      simulateSelector: '[data-dnb-test="input-search"] input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
