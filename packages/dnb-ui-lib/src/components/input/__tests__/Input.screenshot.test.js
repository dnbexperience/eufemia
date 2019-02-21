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
  // it('have to match "dnb-input--primary"', async () => {
  //   const screenshot = await testPageScreenshot({
  //     selector: '[data-dnb-test="input-primary"]'
  //   })
  //   expect(screenshot).toMatchImageSnapshot()
  // })
  // it('have to match "dnb-input--primary" with hover state', async () => {
  //   const screenshot = await testPageScreenshot({
  //     selector: '[data-dnb-test="input-primary"]',
  //     simulate: 'hover'
  //   })
  //   expect(screenshot).toMatchImageSnapshot()
  // })
  // it('have to match "dnb-input--primary" with active state', async () => {
  //   const screenshot = await testPageScreenshot({
  //     selector: '[data-dnb-test="input-primary"]',
  //     simulate: 'active'
  //   })
  //   expect(screenshot).toMatchImageSnapshot()
  // })
  // it('have to match "dnb-input--primary" with focus state', async () => {
  //   const screenshot = await testPageScreenshot({
  //     selector: '[data-dnb-test="input-primary"]',
  //     simulate: 'focus'
  //   })
  //   expect(screenshot).toMatchImageSnapshot()
  // })
  // it('have to match primary input with href', async () => {
  //   const screenshot = await testPageScreenshot({
  //     selector: '[data-dnb-test="input-anchor"]'
  //   })
  //   expect(screenshot).toMatchImageSnapshot()
  // })
})
