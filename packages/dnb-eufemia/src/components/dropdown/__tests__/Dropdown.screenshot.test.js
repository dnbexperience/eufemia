/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Dropdown screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/dropdown/demos',
    timeout: 300e3
  })
  it('have to match the closed dropdown', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match different sizes', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dropdown-sizes"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown with icon on left side', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dropdown-left-icon"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown with status: error', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="dropdown-status-error"] .dnb-dropdown__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown as more_menu', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dropdown-more_menu"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown with tertiary button', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown as action menu', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="dropdown-action_menu"] .dnb-dropdown__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the closed dropdown with focus', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the closed dropdown with hover', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown items', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="dropdown-list"] .dnb-drawer-list__list',
      simulateSelector:
        '[data-visual-test="dropdown-list"] .dnb-drawer-list__option:nth-of-type(1)',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match different item direactions', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        height: '16rem'
      },
      selector:
        '[data-visual-test="dropdown-item-directions"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-item-directions"] .dnb-dropdown__trigger',
      simulate: 'click'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown with click', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'focusclick' // use focusclick because of the delayed positioning of the drawer
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown action menu with custom items', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dropdown-action_menu-custom"]',
      simulateSelector:
        '[data-visual-test="dropdown-action_menu-custom"] .dnb-dropdown:nth-of-type(1) .dnb-dropdown__trigger',
      simulate: 'focusclick' // use focusclick because of the delayed positioning of the drawer
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown as more_menu opened on left side', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dropdown-more_menu"]',
      simulateSelector:
        '[data-visual-test="dropdown-more_menu"] .dnb-dropdown:nth-of-type(1) .dnb-dropdown__trigger',
      waitAfterSimulate: 100,
      simulate: 'click'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the dropdown as more_menu opened on right side', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="dropdown-more_menu"]',
      simulateSelector:
        '[data-visual-test="dropdown-more_menu"] .dnb-dropdown:nth-of-type(2) .dnb-dropdown__trigger',
      waitAfterSimulate: 100,
      simulate: 'click'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
