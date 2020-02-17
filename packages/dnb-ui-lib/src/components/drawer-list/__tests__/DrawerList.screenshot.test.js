/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('DrawerList screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/drawer-list/demos' })
  it('have to match the closed drawer-list', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="drawer-list-closed"] .dnb-drawer-list__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the closed drawer-list with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="drawer-list-closed"] .dnb-drawer-list__inner',
      simulateSelector:
        '[data-dnb-test="drawer-list-closed"] .dnb-drawer-list__trigger',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the closed drawer-list with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="drawer-list-closed"] .dnb-drawer-list__inner',
      simulateSelector:
        '[data-dnb-test="drawer-list-closed"] .dnb-drawer-list__trigger',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the drawer-list items', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="drawer-list-list"] .dnb-drawer-list__list',
      simulateSelector:
        '[data-dnb-test="drawer-list-list"] .dnb-drawer-list__option:nth-of-type(1)',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the drawer-list with click', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="drawer-list-closed"] .dnb-drawer-list__inner',
      simulateSelector:
        '[data-dnb-test="drawer-list-closed"] .dnb-drawer-list__trigger',
      simulate: 'click'
      // waitAfterSimulateSelector:
      //   '[data-dnb-test="drawer-list-closed"] .dnb-drawer-list__options',
      // waitAfterSimulate: 100 // to make sure we make the screenshot afte the animation is show
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the drawer-list with icon on left side', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="drawer-list-left-icon"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the drawer-list with status: error', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-dnb-test="drawer-list-status-error"] .dnb-drawer-list__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the drawer-list as more_menu', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="drawer-list-more_menu"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the drawer-list as small more_menu', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '2rem',
        height: '2rem'
      },
      selector: '[data-dnb-test="drawer-list-more_menu"]',
      simulateSelector:
        '[data-dnb-test="drawer-list-more_menu"] .dnb-drawer-list:nth-of-type(1) .dnb-drawer-list__trigger',
      simulate: 'click'
      // waitAfterSimulateSelector:
      //   '[data-dnb-test="drawer-list-more_menu"] .dnb-drawer-list:nth-of-type(1) .dnb-drawer-list__options',
      // waitAfterSimulate: 100 // to make sure we make the screenshot afte the animation is show
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
