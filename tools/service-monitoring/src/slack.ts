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
