import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const colorScheme of ['light', 'dark'] as const) {
  describe('Chat prompt actions in ' + colorScheme, () => {
    setupPageScreenshot({
      themeName: 'ui',
      colorScheme,
      url: '/web/patterns-and-extensions/chat/PromptInput/demos/',
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
