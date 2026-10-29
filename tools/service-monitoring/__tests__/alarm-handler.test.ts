import { afterEach, beforeEach, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({
  db: vi.fn(),
  secret: vi.fn(),
  process: vi.fn(),
  post: vi.fn(),
  update: vi.fn(),
}))
vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    send = mocks.db
  },
  GetItemCommand: class {
    constructor(public input: unknown) {}
  },
  PutItemCommand: class {
    constructor(public input: unknown) {}
  },
}))
vi.mock('../src/secrets.ts', () => ({ readSecret: mocks.secret }))
vi.mock('../src/notifications.ts', () => ({
  processNotification: mocks.process,
}))
vi.mock('../src/slack-api.ts', () => ({
  parseSlackConfig: () => ({}),
  slackApi: () => ({ post: mocks.post, update: mocks.update }),
}))
import { handler } from '../src/alarm-handler.ts'
const topic = 'test-topic'
function event(value: unknown) {
  return {
    Records: [
      { Sns: { TopicArn: topic, Message: JSON.stringify(value) } },
    ],
  }
}
beforeEach(() => {
  vi.resetAllMocks()
  vi.stubEnv('NOTIFICATIONS_ENABLED', 'true')
  vi.stubEnv('ALERT_TOPIC_ARN', topic)
  vi.stubEnv('STATE_TABLE', 'test-state')
  vi.stubEnv('SLACK_BOT_SECRET_ARN', 'test-bot-secret')
  mocks.secret.mockResolvedValue('test')
  mocks.process.mockResolvedValue(undefined)
  vi.spyOn(process.stdout, 'write').mockReturnValue(true)
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})
it('routes CloudWatch transitions through the shared deduplicating notifier', async () => {
  await handler(
    event({
      AlarmName: 'missing-cdn',
      NewStateValue: 'ALARM',
      StateChangeTime: '2026-10-23T10:00:00Z',
    })
  )
  expect(mocks.process).toHaveBeenCalledWith(
    {
      kind: 'alarm',
      name: 'missing-cdn',
      status: 'ALARM',
      at: '2026-10-23T10:00:00Z',
    },
    expect.any(Object)
  )
})
it('routes service observations through the same notifier', async () => {
  const value = {
    kind: 'service',
    service: 'CDN',
    report: {
      status: 'healthy',
      checkedAt: '2026-10-23T10:00:00Z',
      checks: [],
    },
  }
  await handler(event(value))
  expect(mocks.process).toHaveBeenCalledWith(value, expect.any(Object))
})
it('rejects other topics before reading the bot secret', async () => {
  const value = event({})
  value.Records[0].Sns.TopicArn = 'other'
  await expect(handler(value)).rejects.toThrow()
  expect(mocks.secret).not.toHaveBeenCalled()
})
it('ignores disabled notifications without API calls', async () => {
  vi.stubEnv('NOTIFICATIONS_ENABLED', 'false')
  await handler(event({}))
  expect(mocks.secret).not.toHaveBeenCalled()
})
it('rejects malformed timestamps and payloads', async () => {
  await expect(
    handler(
      event({
        AlarmName: 'missing',
        NewStateValue: 'OK',
        StateChangeTime: 'bad',
      })
    )
  ).rejects.toThrow()
  expect(mocks.process).not.toHaveBeenCalled()
})
