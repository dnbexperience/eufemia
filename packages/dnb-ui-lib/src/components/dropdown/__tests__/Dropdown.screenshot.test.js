/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Dropdown screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/dropdown' })
  it('have to match the closed dropdown', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="dropdown-closed"] .dnb-dropdown__clamp'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the closed dropdown with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="dropdown-closed"] .dnb-dropdown__clamp',
      simulateSelector:
        '[data-dnb-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the closed dropdown with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="dropdown-closed"] .dnb-dropdown__clamp',
      simulateSelector:
        '[data-dnb-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown with click', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="dropdown-closed"] .dnb-dropdown__clamp',
      simulate: 'click',
      waitFor: 10 // to make sure we make the screenshot afte the animation is show
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown items', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="dropdown-list"] .dnb-dropdown__list',
      simulateSelector:
        '[data-dnb-test="dropdown-list"] li.dnb-dropdown__option:nth-of-type(1)',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
