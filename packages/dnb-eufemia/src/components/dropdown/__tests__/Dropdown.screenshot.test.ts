/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import { makeScreenshot } from '../../../core/jest/jestSetupScreenshots'

describe('Dropdown', () => {
  const defaults = {
    url: '/uilib/components/dropdown/demos',
  }

  it('have to match the closed dropdown', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match different sizes', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="dropdown-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled state', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="dropdown-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tertiary variant disabled state', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="dropdown-disabled-tertiary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown with icon on left side', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector: '[data-visual-test="dropdown-left-icon"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown with status: error', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="dropdown-status-error"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown with tertiary button', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown as action menu', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="dropdown-action_menu"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match different item directions', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/dropdown/demos?item-directions',
      pageViewport: {
        width: 480,
        height: 480,
      },
      style: {
        'padding-top': '16rem',
      },
      selector: '[data-visual-test="dropdown-item-directions"]',
      simulateSelector:
        '[data-visual-test="dropdown-item-directions"] .dnb-dropdown__trigger',
      waitAfterSimulate: 200, // it takes time for the portal to align
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the closed dropdown with focus', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'focus',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the closed dropdown with hover', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown items', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      style: {
        width: '14rem',
      },
      selector:
        '[data-visual-test="dropdown-list"] .dnb-drawer-list__list',
      simulateSelector:
        '[data-visual-test="dropdown-list"] .dnb-drawer-list__option:nth-of-type(1)',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown button with ellipsis overflow', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="dropdown-ellipsis"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown action menu with custom items', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/dropdown/demos?action_menu-custom',
      pageViewport: {
        width: 2000,
      },
      selector: '[data-visual-test="dropdown-action_menu-custom"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown action menu in mobile view', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/dropdown/demos?action_menu-custom',
      pageViewport: {
        width: 600,
      },
      selector: '[data-visual-test="dropdown-action_menu-custom"]',
      style: {
        width: '14rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown button in active state', async () => {
    const screenshot = await makeScreenshot({
      ...defaults,
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'longclick',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown as more_menu opened on left side', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/dropdown/demos?left-side',
      pageViewport: {
        width: 480,
      },
      selector: '[data-visual-test="dropdown-more_menu"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown as more_menu opened on right side', async () => {
    const screenshot = await makeScreenshot({
      url: '/uilib/components/dropdown/demos?right-side',
      pageViewport: {
        width: 480,
        height: 480,
      },
      selector: '[data-visual-test="dropdown-more_menu"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
