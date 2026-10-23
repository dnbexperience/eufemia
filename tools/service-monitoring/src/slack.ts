const slackErrorCodes = new Set([
  'not_in_channel',
  'channel_not_found',
  'invalid_auth',
  'token_revoked',
  'account_inactive',
  'missing_scope',
  'message_not_found',
  'cant_update_message',
  'edit_window_closed',
  'is_archived',
  'ratelimited',
  'internal_error',
  'duplicate_message_not_found',
  'duplicate_channel_not_found',
])

export class SlackNotificationError extends Error {
  readonly code?: string
  constructor(
    public readonly httpStatus?: number,
    code?: unknown
  ) {
    super('Slack notification could not be delivered')
    this.name = 'SlackNotificationError'
    this.code =
      typeof code === 'string' && slackErrorCodes.has(code)
        ? code
        : undefined
  }
}

export async function sendSlack(
  webhook: string,
  text: string,
  request: typeof fetch = fetch
) {
  try {
    const url = new URL(webhook)
    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'hooks.slack.com' ||
      url.port ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      !/^\/services\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/.test(
        url.pathname
      )
    ) {
      throw new Error('Invalid webhook')
    }
    const response = await request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        unfurl_links: false,
        unfurl_media: false,
      }),
      signal: AbortSignal.timeout(15_000),
      redirect: 'error',
    })
    if (!response.ok || (await response.text()) !== 'ok') {
      throw new SlackNotificationError(response.status)
    }
  } catch (error) {
    // Request errors can contain the secret URL.
    throw error instanceof SlackNotificationError
      ? error
      : new SlackNotificationError()
  }
}
