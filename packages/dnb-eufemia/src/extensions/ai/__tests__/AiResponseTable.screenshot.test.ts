import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const colorScheme of ['light', 'dark'] as const) {
  describe('AI response table overflow in ' + colorScheme, () => {
    setupPageScreenshot({
      themeName: 'ui',
      colorScheme,
      url: '/web/extensions/ai/Response/demos/',
    })
    it('shows a readable hint below a narrow table', async () => {
      await makeScreenshot({
        style: {
          'background-color': 'var(--token-color-background-neutral)',
          color: 'var(--token-color-text-neutral)',
        },
        styleSelector:
          '[data-visual-test="ai-response-overflow-table"] .dnb-ai-response',
        selector: '[data-visual-test="ai-response-overflow-table"]',
      })
    })
  })
}
