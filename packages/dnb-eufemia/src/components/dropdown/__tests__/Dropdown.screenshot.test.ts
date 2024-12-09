/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Dropdown for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/dropdown/demos',
  })

  it('have to match the closed dropdown', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match different sizes', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-sizes"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-disabled"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match disabled options', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-bottom': '14rem',
      },
      selector: '[data-visual-test="dropdown-disabled-options"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-disabled-options"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match tertiary variant disabled state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-disabled-tertiary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown with icon on left side', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-left-icon"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown with status: error', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-status-error"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown with tertiary button', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown as action menu', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-action_menu"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the closed dropdown with focus', async () => {
    const screenshot = await makeScreenshot({
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
      selector:
        '[data-visual-test="dropdown-ellipsis"] .dnb-dropdown__inner',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown button in active state', async () => {
    const screenshot = await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown action menu with custom items', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-action_menu-custom"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-action_menu-custom"] .dnb-dropdown__trigger',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe.each(['ui', 'sbanken'])('Dropdown for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/dropdown/demos',
    pageViewport: {
      width: 480,
      height: 480 * 2,
    },
  })

  it('have to match the tertiary variant opened on left side', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-tertiary"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
      style: {
        'padding-bottom': '16rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the tertiary variant opened on right side', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-tertiary-right"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-tertiary-right"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
      style: {
        'padding-bottom': '16rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match different item directions', async () => {
    const screenshot = await makeScreenshot({
      style: {
        'padding-top': '16rem',
      },
      selector: '[data-visual-test="dropdown-item-directions"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-item-directions"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown as more_menu opened on left side', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-more_menu"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-more_menu"] .dnb-dropdown:first-child button',
      simulateAfter: { keypress: 'Escape' },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown as more_menu opened on right side', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-more_menu"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-more_menu"] .dnb-dropdown:nth-child(2) button',
      simulateAfter: { keypress: 'Escape' },
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the dropdown action menu in mobile view', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="dropdown-action_menu-custom"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-action_menu-custom"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
      style: {
        width: '14rem',
      },
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
