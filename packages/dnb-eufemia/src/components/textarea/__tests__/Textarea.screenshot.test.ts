/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Textarea for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/textarea/demos',
  })

  it('have to match the "default" textarea style', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="textarea-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match character counter', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="textarea-character-counter"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the default error textarea style', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="textarea-error"]',
      styleSelector: '[data-visual-test="textarea-error"] textarea',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the error textarea "hover"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="textarea-error"]',
      simulateSelector: '[data-visual-test="textarea-error"] textarea',
      simulate: 'hover',
      styleSelector: '[data-visual-test="textarea-error"] textarea',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the error textarea mouse focus', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="textarea-error"]',
      simulateSelector: '[data-visual-test="textarea-error"] textarea',
      simulate: 'click',
      styleSelector: '[data-visual-test="textarea-error"] textarea',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the error textarea "focus"', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="textarea-error"]',
      simulateSelector: '[data-visual-test="textarea-error"] textarea',
      simulate: 'focus', // should be tested first
      styleSelector: '[data-visual-test="textarea-error"] textarea',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match stretched textarea style', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '30rem', // make sure our textarea gets an explicit width, because of mac/linux rendering differences
      },
      // styleSelector: '[data-visual-test="textarea-stretch"]',
      selector: '[data-visual-test="textarea-stretch"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "hover" textarea style', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="textarea-default"]',
      simulateSelector: '[data-visual-test="textarea-default"] textarea',
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the mouse focus textarea style', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="textarea-default"]',
      simulateSelector: '[data-visual-test="textarea-default"] textarea',
      simulate: 'click',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "focus" textarea style', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="textarea-default"]',
      simulateSelector: '[data-visual-test="textarea-default"] textarea',
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
