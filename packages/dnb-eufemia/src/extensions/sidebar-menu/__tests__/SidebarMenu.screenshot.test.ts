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

  it('matches a selected linked accordion with nested content', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="sidebar-menu-declarative"]',
      style: { width: '24rem' },
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="sidebar-menu-declarative"] a[href="#products"]',
      recalculateHeightAfterSimulate: true,
    })
  })
})
