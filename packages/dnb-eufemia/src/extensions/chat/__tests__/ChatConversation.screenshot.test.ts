import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Chat conversation', () => {
  setupPageScreenshot({
    url: '/web/patterns-and-extensions/chat/Conversation/demos/',
  })

  it('shows the focus ring on the latest message when it gets focus', async () => {
    const selector = '[data-visual-test="ai-conversation"]'

    await makeScreenshot({
      selector,
      // Like "Go to latest message", which makes the message focusable
      executeBeforeSimulate: () => {
        const messages = document.querySelectorAll(
          '[data-visual-test="ai-conversation"] .dnb-ai-message'
        )
        messages[messages.length - 1].setAttribute('tabindex', '-1')
      },
      simulate: [
        {
          action: 'focus',
          selector: selector + ' .dnb-ai-message[tabindex="-1"]',
        },
      ],
    })
  })
})
