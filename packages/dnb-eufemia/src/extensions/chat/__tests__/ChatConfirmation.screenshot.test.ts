import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Chat confirmation', () => {
  setupPageScreenshot({
    url: '/web/patterns-and-extensions/chat/Confirmation/demos/',
  })

  it('shows the focus ring on the card after a keyboard decision', async () => {
    const selector = '[data-visual-test="ai-confirmation-interactive"]'

    await makeScreenshot({
      selector,
      simulate: [
        {
          action: 'focus',
          selector:
            selector + ' .dnb-ai-confirmation__actions .dnb-button',
        },
        { keypress: 'Enter' },
      ],
    })
  })
})
