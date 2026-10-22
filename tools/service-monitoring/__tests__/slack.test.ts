import { describe, expect, it, vi } from 'vitest'
import { sendSlack } from '../src/slack.ts'

const webhook = 'https://hooks.slack.com/services/TEST/ONLY/EXAMPLE'

describe('Slack delivery', () => {
  it('requires Slack acknowledgement and prevents redirects', async () => {
    const request = vi.fn(async () => new Response('ok'))
    await sendSlack(webhook, 'Test alert', request)
    expect(request).toHaveBeenCalledWith(
      new URL(webhook),
      expect.objectContaining({
        redirect: 'error',
        body: JSON.stringify({
          text: 'Test alert',
          unfurl_links: false,
          unfurl_media: false,
        }),
      })
    )
  })

  it.each([
    'https://example.com/services/TEST/ONLY/EXAMPLE',
    'https://hooks.slack.com.example.com/services/TEST/ONLY/EXAMPLE',
    'http://hooks.slack.com/services/TEST/ONLY/EXAMPLE',
    webhook + '?secret=example',
    'https://user@hooks.slack.com/services/TEST/ONLY/EXAMPLE',
    'not a URL',
  ])(
    'rejects an invalid webhook without making a request',
    async (url) => {
      const request = vi.fn()
      await expect(sendSlack(url, 'test', request)).rejects.toThrow(
        'Slack notification could not be delivered'
      )
      expect(request).not.toHaveBeenCalled()
    }
  )

  it.each([new Response('no'), new Response('ok', { status: 429 })])(
    'rejects unsuccessful Slack delivery',
    async (response) => {
      await expect(
        sendSlack(webhook, 'test', async () => response)
      ).rejects.toThrow('Slack notification could not be delivered')
    }
  )

  it('does not expose the webhook in request failures', async () => {
    const request = vi.fn(async () => {
      throw new Error('Request failed at ' + webhook)
    })
    await expect(sendSlack(webhook, 'test', request)).rejects.toThrow(
      /^Slack notification could not be delivered$/
    )
  })
})
