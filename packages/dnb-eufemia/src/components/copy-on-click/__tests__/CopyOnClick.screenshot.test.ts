import {
  test,
  expect,
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/playwright/screenshotSetup'

test.describe('CopyOnClick', () => {
  setupPageScreenshot({
    url: '/uilib/components/copy-on-click/demos/',
  })

  const style = {
    display: 'block',
    'padding-top': '1.5rem',
    'max-width': '30rem',
  }

  test('have to match tooltip', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-default"]',
      style,
      simulate: 'click',
      simulateSelector: '.dnb-copy-on-click',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchSnapshot()
  })
})

test.describe('CopyOnClick in drawer', () => {
  const pageViewport = {
    width: 200,
    height: 200,
  }
  setupPageScreenshot({
    url: '/uilib/components/copy-on-click/screenshot-test/',
    pageViewport,
  })

  test('have to match tooltip', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="copy-on-click-inside-drawer"]',
      simulate: 'click',
      simulateSelector: '.dnb-copy-on-click',
      screenshotSelector: '.dnb-modal__content .dnb-scroll-view',
      recalculateHeightAfterSimulate: true,
    })
    expect(screenshot).toMatchSnapshot()
  })
})
