import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const colorScheme of ['light', 'dark'] as const) {
  describe('AI prompt actions in ' + colorScheme, () => {
    setupPageScreenshot({
      themeName: 'ui',
      colorScheme,
      url: '/uilib/extensions/ai/PromptInput/demos/',
    })

    it('places custom controls around the default toolbar', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="ai-prompt-input-custom"]',
      })
    })

    it('places a custom action before the compact textarea', async () => {
      await makeScreenshot({
        selector: '[data-visual-test="ai-prompt-input-custom-compact"]',
      })
    })
  })
}
