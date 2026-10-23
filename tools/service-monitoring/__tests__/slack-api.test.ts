import { expect, it, vi } from 'vitest'
import { parseSlackConfig, slackApi } from '../src/slack-api.ts'
import { SlackNotificationError } from '../src/slack.ts'
const config = { token: 'xoxb-test-only', channel: 'C123TEST' }
it('posts recovery only to the recorded thread and updates the existing summary', async () => {
  const request = vi.fn(async (_input: unknown, _init?: RequestInit) =>
    Response.json({ ok: true, ts: '123.456' })
  )
  const slack = slackApi(config, request)
  expect(await slack.post('recovered', 'test-id', '122.345')).toBe(
    '123.456'
  )
  await slack.update('121.234', 'summary')
  expect(request.mock.calls[0]?.[0]).toBe(
    'https://slack.com/api/chat.postMessage'
  )
  const payload = JSON.parse(String(request.mock.calls[0]?.[1]?.body))
  expect(payload).toMatchObject({
    thread_ts: '122.345',
    reply_broadcast: false,
    client_msg_id: 'test-id',
  })
  expect(request.mock.calls[1]?.[0]).toBe(
    'https://slack.com/api/chat.update'
  )
})
it('sanitizes request failures and refuses redirects', async () => {
  const request = vi.fn(async () => {
    throw new Error(config.token)
  })
  await expect(
    slackApi(config, request).post('test', 'id')
  ).rejects.toThrow(/^Slack notification could not be delivered$/)
  expect(request).toHaveBeenCalledWith(
    'https://slack.com/api/chat.postMessage',
    expect.objectContaining({ redirect: 'error' })
  )
})
it('rejects an incoming webhook as bot configuration', () => {
  expect(() =>
    parseSlackConfig('https://hooks.slack.com/services/TEST/ONLY/EXAMPLE')
  ).toThrow()
  expect(() =>
    parseSlackConfig(JSON.stringify({ ...config, channel: 'invalid' }))
  ).toThrow()
})
it('does not acknowledge a Slack API error even with HTTP 200', async () => {
  await expect(
    slackApi(config, async () =>
      Response.json({ ok: false, error: 'not_in_channel' })
    ).post('test', 'id')
  ).rejects.toThrow()
})
it.each([
  'not_in_channel',
  'invalid_auth',
  'message_not_found',
  'duplicate_message_not_found',
])(
  'preserves the safe Slack error code %s without acknowledging delivery',
  async (code) => {
    await expect(
      slackApi(config, async () =>
        Response.json({ ok: false, error: code })
      ).post('test', 'id')
    ).rejects.toMatchObject({ code })
  }
)
it('does not preserve arbitrary Slack response values', async () => {
  const secret = 'secret response body'
  await expect(
    slackApi(config, async () =>
      Response.json({ ok: false, error: secret })
    ).post('test', 'id')
  ).rejects.toMatchObject({ code: undefined })
  expect(
    JSON.stringify(new SlackNotificationError(200, secret))
  ).not.toContain(secret)
})

it('rejects a webhook-like bot credential and an arbitrary request destination', () => {
  expect(() =>
    parseSlackConfig(
      JSON.stringify({
        token: 'https://hooks.slack.com/services/TEST/ONLY/EXAMPLE',
        channel: 'C123TEST',
      })
    )
  ).toThrow()
})
