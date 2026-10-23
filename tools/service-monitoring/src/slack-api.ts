import { SlackNotificationError } from './slack.ts'

type Config = { token: string; channel: string }
export function parseSlackConfig(secret: string): Config {
  const config = JSON.parse(secret) as Config
  if (
    !/^xoxb-[A-Za-z0-9-]+$/.test(config.token) ||
    !/^[CG][A-Z0-9]+$/.test(config.channel)
  ) {
    throw new Error('Invalid Slack bot configuration')
  }
  return config
}

export function slackApi(config: Config, request: typeof fetch = fetch) {
  async function call(
    method: 'chat.postMessage' | 'chat.update',
    payload: Record<string, unknown>
  ) {
    try {
      const response = await request('https://slack.com/api/' + method, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + config.token,
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ channel: config.channel, ...payload }),
        redirect: 'error',
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) {
        throw new SlackNotificationError(response.status)
      }
      const data = await response.json()
      if (
        data.ok !== true ||
        typeof data.ts !== 'string' ||
        !/^\d+\.\d+$/.test(data.ts)
      ) {
        throw new SlackNotificationError()
      }
      return data.ts as string
    } catch (error) {
      throw error instanceof SlackNotificationError
        ? error
        : new SlackNotificationError()
    }
  }
  return {
    post: (text: string, id: string, thread?: string) =>
      call('chat.postMessage', {
        text,
        client_msg_id: id,
        ...(thread ? { thread_ts: thread, reply_broadcast: false } : {}),
        unfurl_links: false,
        unfurl_media: false,
      }),
    update: async (timestamp: string, text: string) => {
      await call('chat.update', { ts: timestamp, text })
    },
  }
}
