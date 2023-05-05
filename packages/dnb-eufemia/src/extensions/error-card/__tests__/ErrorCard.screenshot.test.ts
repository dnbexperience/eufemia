/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('ErrorCard', () => {
  setupPageScreenshot({ url: '/uilib/extension/error-card/demos' })

  it('have to match the default', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="error-card-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match centered version', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="error-card-centered"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match centered version with button', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="error-card-centered-with-button"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match slim version', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="error-card-slim"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match custom actions screenshot', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="error-card-custom-actions"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('ErrorCard', () => {
  setupPageScreenshot({
    url: '/uilib/extension/error-card/demos',
    pageViewport: {
      width: 480, // 30rem
    },
  })

  it('have to match small screens', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="error-card-basic"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
