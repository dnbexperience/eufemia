/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Input screenshot', () => {
  const extend = selector => ({
    style: {
      width: '200px' // make sure our input gets an explicit width, because of mac/linux rendering differences
    },
    styleSelector: `[data-dnb-test="${selector}"] .dnb-input__input`,
    simulateSelector: `[data-dnb-test="${selector}"] .dnb-input__input`
  })
  setupPageScreenshot({ url: '/uilib/components/input' })
  it('have to match input with placeholder', async () => {
    const screenshot = await testPageScreenshot({
      ...extend('input-placeholder'),
      selector: '[data-dnb-test="input-placeholder"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match disabled input', async () => {
    const screenshot = await testPageScreenshot({
      ...extend('input-disabled'),
      selector: '[data-dnb-test="input-disabled"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type', async () => {
    const screenshot = await testPageScreenshot({
      ...extend('input-search'),
      selector: '[data-dnb-test="input-search"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match search type with focus state', async () => {
    const screenshot = await testPageScreenshot({
      ...extend('input-search'),
      selector: '[data-dnb-test="input-search"]',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match stretched and large size', async () => {
    const screenshot = await testPageScreenshot({
      // make sure our input gets an explicit width, because of mac/linux rendering differences
      ...{ ...extend('input-large'), style: { width: '300px' } },
      selector: '[data-dnb-test="input-medium"]'
      // simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
