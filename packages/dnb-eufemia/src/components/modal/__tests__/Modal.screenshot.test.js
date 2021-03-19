/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

const pageViewport = {
  width: 700,
  height: 600
}

describe('Modal screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/modal/demos'
  })
  it('have to match the default modal trigger button', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="modal-trigger-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the suffix help button usage', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="modal-help-button"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the default modal window with title', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="modal-trigger-default"] button:first-of-type',
      secreenshotSelector: '.dnb-modal__content__inner'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Modal screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/modal/demos',
    pageViewport
  })
  it('have to match the default modal window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="modal-trigger-default"] button:first-of-type',
      secreenshotSelector: '.dnb-modal__content'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Drawer screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/modal/demos',
    pageViewport
  })
  it('have to match the default drawer window', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="modal-drawer"] button:first-of-type',
      secreenshotSelector: '.dnb-modal__content'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Additional Modal screenshot', () => {
  setupPageScreenshot({
    url: '/uilib/components/modal/demos',
    pageViewport
  })
  it('have to match modal without spacing', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="modal-no-spacing"] button:first-of-type',
      secreenshotSelector: '.dnb-modal__content'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Additional Modal screenshot', () => {
  const pageViewport = {
    width: 400,
    height: 400
  }
  setupPageScreenshot({
    url: '/uilib/components/modal/demos',
    pageViewport
  })
  it('have to match a fullscreen modal', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'div#dnb-modal-root', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-visual-test="modal-fullscreen"] button:first-of-type',
      secreenshotSelector: '.dnb-modal__content'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
