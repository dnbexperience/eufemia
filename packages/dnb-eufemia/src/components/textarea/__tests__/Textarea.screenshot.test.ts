/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(['ui', 'sbanken'])('Textarea for %s', (themeName) => {
  const style = {
    width: '14rem', // make sure our textarea gets an explicit width, because of mac/linux rendering differences
  }
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/textarea/demos',
  })

  it('have to match the "default" textarea style', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="textarea-default"]',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-default"] textarea',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match character counter', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="textarea-character-counter"]',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-default"] textarea',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the default error textarea style', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="textarea-error"]',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-error"] textarea',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the error textarea "hover"', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="textarea-error"]',
      simulateSelector: '[data-visual-test="textarea-error"] textarea',
      simulate: 'hover',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-error"] textarea',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the error textarea mouse focus', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="textarea-error"]',
      simulateSelector: '[data-visual-test="textarea-error"] textarea',
      simulate: 'click',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-error"] textarea',
      waitAfterSimulate: 250,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the error textarea "focus"', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="textarea-error"]',
      simulateSelector: '[data-visual-test="textarea-error"] textarea',
      simulate: 'focus', // should be tested first
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-error"] textarea',
      waitAfterSimulate: 250,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match stretched textarea style', async () => {
    const screenshot = await makeScreenshot({
      style: {
        width: '30rem', // make sure our textarea gets an explicit width, because of mac/linux rendering differences
      },
      // Only for screenshot testing - make textarea having same width on linux chromium
      // styleSelector: '[data-visual-test="textarea-stretch"]',
      selector: '[data-visual-test="textarea-stretch"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "hover" textarea style', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="textarea-default"]',
      simulateSelector: '[data-visual-test="textarea-default"] textarea',
      simulate: 'hover',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-default"] textarea',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the mouse focus textarea style', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="textarea-default"]',
      simulateSelector: '[data-visual-test="textarea-default"] textarea',
      simulate: 'click',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-default"] textarea',
      waitAfterSimulate: 250,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the "focus" textarea style', async () => {
    const screenshot = await makeScreenshot({
      style,
      selector: '[data-visual-test="textarea-default"]',
      simulateSelector: '[data-visual-test="textarea-default"] textarea',
      simulate: 'focus', // should be tested first
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-default"] textarea',
      waitAfterSimulate: 250,
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
