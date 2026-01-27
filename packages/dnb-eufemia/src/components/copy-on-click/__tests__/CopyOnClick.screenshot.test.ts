/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('CopyOnClick', () => {
  setupPageScreenshot({
    url: '/uilib/components/copy-on-click/demos',
  })

  const style = {
    display: 'block',
    'padding-top': '1.5rem',
    'max-width': '30rem',
  }

  it('should match tooltip', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-default"]',
      style,
      simulate: 'click',
      simulateSelector: '.dnb-copy-on-click',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('CopyOnClick in drawer', () => {
  const pageViewport = {
    width: 200,
    height: 200,
  }
  setupPageScreenshot({
    url: '/uilib/components/copy-on-click/screenshot-test',
    pageViewport,
  })

  it('should match tooltip', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-inside-drawer"]',
      simulate: 'click',
      simulateSelector: '.dnb-copy-on-click',
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      waitAfterSimulateSelector: '.dnb-tooltip--active',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
