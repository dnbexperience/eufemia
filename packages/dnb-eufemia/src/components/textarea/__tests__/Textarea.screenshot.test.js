/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Textarea screenshot', () => {
  const style = {
    width: '14rem' // make sure our textarea gets an explicit width, because of mac/linux rendering differences
  }
  setupPageScreenshot({ url: '/uilib/components/textarea/demos' })
  it('have to match the "default" textarea style', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-visual-test="textarea-default"]',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-default"] textarea'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the default error textarea style', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-visual-test="textarea-error"]',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-error"] textarea'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match stretched textarea style', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '30rem' // make sure our textarea gets an explicit width, because of mac/linux rendering differences
      },
      // Only for screenshot testing - make textarea having same width on linux chromium
      // styleSelector: '[data-visual-test="textarea-stretch"]',
      selector: '[data-visual-test="textarea-stretch"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  // we do not make a active state, due to the differences of font rendering
  it('have to match the "focus" textarea style', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-visual-test="textarea-default"]',
      simulateSelector: '[data-visual-test="textarea-default"] textarea',
      simulate: 'focus', // should be tested first
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-default"] textarea'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  // we do not make a active state, due to the differences of font rendering
  it('have to match the "hover" textarea style', async () => {
    const screenshot = await testPageScreenshot({
      style,
      selector: '[data-visual-test="textarea-default"]',
      simulateSelector: '[data-visual-test="textarea-default"] textarea',
      simulate: 'hover',
      // Only for screenshot testing - make textarea having same width on linux chromium
      styleSelector: '[data-visual-test="textarea-default"] textarea'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
