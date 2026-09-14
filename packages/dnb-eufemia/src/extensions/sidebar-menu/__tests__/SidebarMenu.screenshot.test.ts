import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])('SidebarMenu for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/extensions/sidebar-menu/demos/',
  })

  it('matches the declarative menu', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-declarative"]',
      style: { width: '24rem' },
    })
  })

  it('matches the data menu', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-data"]',
      style: { width: '24rem' },
    })
  })

  it('matches wrapped accordion labels', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-data"]',
      style: { width: '12rem' },
    })
  })

  it('matches the open section selector', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-declarative"]',
      style: { width: '24rem' },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="sidebar-menu-declarative"] .dnb-dropdown__trigger',
    })
  })

  it('matches the focused section selector', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-declarative"]',
      style: { width: '24rem' },
      simulate: 'focus',
      simulateSelector:
        '[data-visual-test="sidebar-menu-declarative"] .dnb-dropdown__trigger',
    })
  })

  it('matches a keyboard-focused section option', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-declarative"]',
      style: { width: '24rem' },
      simulate: [
        {
          action: 'click',
          selector:
            '[data-visual-test="sidebar-menu-declarative"] .dnb-dropdown__trigger',
        },
        { keypress: 'ArrowDown' },
      ],
    })
  })

  it('matches a focused accordion action', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-declarative"]',
      style: { width: '24rem' },
      simulate: 'focus',
      simulateSelector:
        '[data-visual-test="sidebar-menu-declarative"] [data-sidebar-menu-id="products"] button',
    })
  })

  it('matches a hovered item', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-declarative"]',
      style: { width: '24rem' },
      simulate: 'hover',
      simulateSelector:
        '[data-visual-test="sidebar-menu-declarative"] [data-sidebar-menu-id="overview"] button',
    })
  })

  it('matches a selected item with its original icon', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-declarative"]',
      style: { width: '24rem' },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="sidebar-menu-declarative"] [data-sidebar-menu-id="overview"] button',
    })
  })

  it('closes the declarative Products accordion with one click', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-declarative"]',
      style: { width: '24rem' },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="sidebar-menu-declarative"] [data-sidebar-menu-id="products"] button',
      recalculateHeightAfterSimulate: true,
    })
  })

  it('closes the data Products accordion with one click', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-data"]',
      style: { width: '24rem' },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="sidebar-menu-data"] [data-sidebar-menu-id="data-products"] button',
      recalculateHeightAfterSimulate: true,
    })
  })
})
