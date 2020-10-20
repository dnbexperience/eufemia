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
      selector: '[data-dnb-test="modal-trigger-default"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the suffix help button usage', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="modal-help-button"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the default modal window with title', async () => {
    const screenshot = await testPageScreenshot({
      selector: 'body', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-dnb-test="modal-trigger-default"] .dnb-modal button',
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
      selector: 'body', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector:
        '[data-dnb-test="modal-trigger-default"] .dnb-modal button',
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
      selector: 'body', // only to make sure we have a valid selector
      simulate: 'click',
      simulateSelector: '[data-dnb-test="modal-drawer"] .dnb-modal button',
      secreenshotSelector: '.dnb-modal__content'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
