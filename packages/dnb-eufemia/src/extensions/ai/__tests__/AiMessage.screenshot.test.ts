import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

for (const colorScheme of ['light', 'dark'] as const) {
  describe.each(['ui', 'sbanken', 'eiendom', 'carnegie'])(
    'AI message design in ' + colorScheme + ' for %s',
    (themeName) => {
      setupPageScreenshot({
        themeName,
        colorScheme,
        url: '/uilib/extensions/ai/Message/demos/',
      })
      it('matches bubble colors, sender grouping and avatars', async () => {
        await makeScreenshot({
          selector: '[data-visual-test="ai-message-design"]',
        })
      })
    }
  )
}
