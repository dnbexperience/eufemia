/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Textarea screenshot', () => {
  const style = {
    width: '200px' // make sure our textarea gets an explicit width, because of mac/linux rendering differences
  }
  setupPageScreenshot({ url: '/uilib/components/textarea' })
  it('have to match textarea with placeholder', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="textarea-placeholder"] .dnb-textarea'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match disabled textarea', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="textarea-disabled"] .dnb-textarea'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="textarea-search"] .dnb-textarea'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type with focus state', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-dnb-test="textarea-search"] .dnb-textarea',
      simulateSelector: '[data-dnb-test="textarea-search"] textarea',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
