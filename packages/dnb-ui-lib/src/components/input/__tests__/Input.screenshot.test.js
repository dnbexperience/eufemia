/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Input screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/input' })
  it('have to match input with placeholder', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="input-placeholder"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match disabled input', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="input-disabled"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="input-search"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="input-search"]',
      simulateSelector: '[data-dnb-test="input-search"] input',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
