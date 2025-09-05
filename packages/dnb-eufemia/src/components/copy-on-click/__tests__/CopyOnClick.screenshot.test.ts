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

  it('have to match tooltip', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-default"]',
      style,
      simulate: 'click',
      simulateSelector: '.dnb-copy-on-click',
      waitAfterSimulate: 250,
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('CopyOnClick in drawer', () => {
  const pageViewport = {
    width: 700,
    height: 600,
  }
  setupPageScreenshot({
    url: '/uilib/components/copy-on-click/screenshot-test',
    pageViewport,
  })

  it('have to match tooltip', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-inside-drawer"]',
      simulate: 'click',
      simulateSelector: '.dnb-copy-on-click',
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      waitAfterSimulate: 250,
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
