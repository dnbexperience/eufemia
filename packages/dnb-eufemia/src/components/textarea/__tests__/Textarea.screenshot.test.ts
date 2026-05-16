import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken', 'carnegie'])(
  `Textarea for %s`,
  (themeName) => {
    const style = {
      width: '14rem', // make sure our textarea gets an explicit width, because of mac/linux rendering differences
    }
    setupPageScreenshot({
      themeName,
      url: '/uilib/components/textarea/demos/',
    })

    it('have to match the "default" textarea style', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-default"]',
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-default"] textarea',
      })
    })

    it('have to match character counter', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-character-counter"]',
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-default"] textarea',
      })
    })

    it('have to match the default error textarea style', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-error"]',
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-error"] textarea',
      })
    })

    it('have to match the default disabled textarea style', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-disabled"]',
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-disabled"] textarea',
      })
    })

    it('have to match the error textarea "hover"', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-error"]',
        simulateSelector: '[data-visual-test="textarea-error"] textarea',
        simulate: 'hover',
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-error"] textarea',
      })
    })

    it('have to match the error textarea mouse focus', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-error"]',
        simulateSelector: '[data-visual-test="textarea-error"] textarea',
        simulate: 'click',
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-error"] textarea',
      })
    })

    it('have to match the error textarea "focus"', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-error"]',
        simulateSelector: '[data-visual-test="textarea-error"] textarea',
        simulate: 'focus', // should be tested first
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-error"] textarea',
      })
    })

    it('have to match stretched textarea style', async () => {
      await makeScreenshot({
        style: {
          width: '30rem', // make sure our textarea gets an explicit width, because of mac/linux rendering differences
        },
        // Only for screenshot testing - make textarea having same width on linux chromium
        // styleSelector: '[data-visual-test="textarea-stretch"]',
        selector: '[data-visual-test="textarea-stretch"]',
      })
    })

    it('have to match the "hover" textarea style', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-default"]',
        simulateSelector: '[data-visual-test="textarea-default"] textarea',
        simulate: 'hover',
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-default"] textarea',
      })
    })

    it('have to match the mouse focus textarea style', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-default"]',
        simulateSelector: '[data-visual-test="textarea-default"] textarea',
        simulate: 'click',
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-default"] textarea',
      })
    })

    it('have to match the "focus" textarea style', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-default"]',
        simulateSelector: '[data-visual-test="textarea-default"] textarea',
        simulate: 'focus', // should be tested first
        // Only for screenshot testing - make textarea having same width on linux chromium
        styleSelector: '[data-visual-test="textarea-default"] textarea',
      })
    })

    it('have to match different sizes', async () => {
      await makeScreenshot({
        style,
        selector: '[data-visual-test="textarea-sizes"]',
        styleSelector:
          '[data-visual-test="textarea-sizes"] .dnb-flex-container',
      })
    })
  }
)
