import { describe, it } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Chat agent action', () => {
  setupPageScreenshot({
    url: '/web/patterns-and-extensions/chat/AgentAction/demos/',
  })

  it('shows the focus ring on the status after Undo with the keyboard', async () => {
    const selector = '[data-visual-test="ai-agent-action-pending-undo"]'

    await makeScreenshot({
      selector,
      simulate: [
        {
          action: 'focus',
          selector: selector + ' .dnb-ai-agent-action__undo-button',
        },
        { keypress: 'Enter' },
      ],
    })
  })
})
