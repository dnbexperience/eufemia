import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`Dropdown for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/dropdown/demos/',
  })

  it('have to match the closed dropdown', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
    })
  })

  it('have to match different sizes', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="dropdown-sizes"]',
    })
  })

  it('have to match disabled state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="dropdown-disabled"]',
    })
  })

  it('have to match disabled options', async () => {
    await makeScreenshot({
      style: {
        'padding-bottom': '14rem',
      },
      selector: '[data-visual-test="dropdown-disabled-options"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-disabled-options"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
    })
  })

  it('have to match tertiary variant disabled state', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="dropdown-disabled-tertiary"]',
    })
  })

  it('have to match the dropdown with icon on left side', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="dropdown-left-icon"]',
    })
  })

  it('have to match the dropdown with status: error', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-status-error"] .dnb-dropdown__inner',
    })
  })

  it('have to match the dropdown with tertiary button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__inner',
    })
  })

  it('have to match the dropdown with tertiary button in focus state', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__trigger',
      simulate: 'focus',
    })
  })

  it('have to match the closed dropdown with focus', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'focus',
    })
  })

  it('have to match the closed dropdown with hover', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'hover',
    })
  })

  it('have to match the dropdown items', async () => {
    await makeScreenshot({
      style: {
        width: '14rem',
      },
      selector:
        '[data-visual-test="dropdown-list"] .dnb-drawer-list__list',
      simulateSelector:
        '[data-visual-test="dropdown-list"] .dnb-drawer-list__option:nth-of-type(1)',
      simulate: 'hover',
    })
  })

  it('have to match the dropdown button with ellipsis overflow', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-ellipsis"] .dnb-dropdown__inner',
    })
  })

  it('have to match the dropdown button in active state', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__inner',
      simulateSelector:
        '[data-visual-test="dropdown-closed"] .dnb-dropdown__trigger',
      simulate: 'active',
    })
  })

  it('have to match the dropdown with groups', async () => {
    await makeScreenshot({
      style: {
        'padding-bottom': '26rem',
      },
      selector: '[data-visual-test="dropdown-groups"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-groups"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
    })
  })
})

describe.each(['ui', 'sbanken'])(`Dropdown for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/dropdown/demos/',
    pageViewport: {
      width: 480,
      height: 480 * 2,
    },
  })

  it('have to match different item directions', async () => {
    await makeScreenshot({
      style: {
        'padding-top': '16rem',
      },
      selector: '[data-visual-test="dropdown-item-directions"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-item-directions"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
    })
  })

  it('have to match the dropdown with independentWidth opened with icon_position left', async () => {
    await makeScreenshot({
      style: {
        'padding-top': '16rem',
      },
      selector: '[data-visual-test="dropdown-independent_width_left"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-independent_width_left"] .dnb-dropdown button',
      simulateAfter: { keypress: 'Escape' },
    })
  })

  it('have to match the dropdown with independentWidth opened with icon_position right', async () => {
    await makeScreenshot({
      style: {
        'padding-top': '16rem',
      },
      selector: '[data-visual-test="dropdown-independent_width_right"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-independent_width_right"] .dnb-dropdown button',
      simulateAfter: { keypress: 'Escape' },
    })
  })
})

describe.each(['ui', 'sbanken'])(`Dropdown for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/dropdown/demos/',
  })

  it('have to match the tertiary variant opened on left side', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="dropdown-tertiary"]',
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="dropdown-tertiary"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
      style: {
        'padding-bottom': '20rem',
        'padding-right': '5rem',
      },
    })
  })

  it('have to match the tertiary variant opened on right side', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="dropdown-tertiary-right"]',
      simulate: ['focus', 'click'],
      simulateSelector:
        '[data-visual-test="dropdown-tertiary-right"] .dnb-dropdown__trigger',
      simulateAfter: { keypress: 'Escape' },
      style: {
        'padding-bottom': '20rem',
        'padding-right': '5rem',
      },
    })
  })
})
