import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('CopyOnClick', () => {
  setupPageScreenshot({
    url: '/uilib/components/copy-on-click/demos/',
  })

  const style = {
    display: 'block',
    'padding-top': '1.5rem',
    'max-width': '30rem',
  }

  it('have to match tooltip', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-default"]',
      style,
      simulate: 'click',
      simulateSelector: '.dnb-copy-on-click',
      recalculateHeightAfterSimulate: true,
    })
  })
})

describe('CopyOnClick in drawer', () => {
  const pageViewport = {
    width: 200,
    height: 200,
  }
  setupPageScreenshot({
    url: '/uilib/components/copy-on-click/screenshot-test/',
    pageViewport,
  })

  it('have to match tooltip', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-inside-drawer"]',
      simulate: 'click',
      simulateSelector: '.dnb-copy-on-click',
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      recalculateHeightAfterSimulate: true,
    })
  })
})
