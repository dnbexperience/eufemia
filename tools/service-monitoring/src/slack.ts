export class SlackNotificationError extends Error {
  constructor(public readonly httpStatus?: number) {
    super('Slack notification could not be delivered')
    this.name = 'SlackNotificationError'
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
      !/^\/services\/[^/]+\/[^/]+\/[^/]+$/.test(url.pathname)
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
