import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({ secret: vi.fn(), slack: vi.fn() }))
vi.mock('../src/secrets.ts', () => ({ readSecret: mocks.secret }))
vi.mock('../src/slack.ts', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../src/slack.ts')>()),
  sendSlack: mocks.slack,
}))
import { handler } from '../src/alarm-handler.ts'

const topic = 'arn:aws:sns:eu-north-1:000000000000:test-alerts'
function event(state = 'ALARM') {
  return {
    Records: [
      {
        Sns: {
          TopicArn: topic,
          Message: JSON.stringify({
            AlarmName: 'test-cdn-not-completing',
            NewStateValue: state,
            NewStateReason: 'No completed check',
          }),
        },
      },
    ],
  }
}
beforeEach(() => {
  vi.resetAllMocks()
  vi.stubEnv('NOTIFICATIONS_ENABLED', 'true')
  vi.stubEnv('ALERT_TOPIC_ARN', topic)
  vi.stubEnv('SLACK_WEBHOOK_SECRET_ARN', 'test-secret')
  mocks.secret.mockResolvedValue('test-webhook')
  mocks.slack.mockResolvedValue(undefined)
})
afterEach(() => vi.unstubAllEnvs())

describe('CloudWatch alarm Slack route', () => {
  it.each(['ALARM', 'OK'])(
    'sends %s to Slack without using incident storage',
    async (state) => {
      await handler(event(state))
      expect(mocks.slack).toHaveBeenCalledWith(
        'test-webhook',
        expect.stringContaining(
          state === 'ALARM' ? 'needs attention' : 'recovered'
        )
      )
    }
  )
  it('stays quiet during shadow verification', async () => {
    vi.stubEnv('NOTIFICATIONS_ENABLED', 'false')
    await handler(event())
    expect(mocks.secret).not.toHaveBeenCalled()
    expect(mocks.slack).not.toHaveBeenCalled()
  })
  it('rejects other topics', async () => {
    const input = event()
    input.Records[0].Sns.TopicArn = 'other-topic'
    await expect(handler(input)).rejects.toThrow(
      'CloudWatch alarm could not be delivered to Slack'
    )
    expect(mocks.slack).not.toHaveBeenCalled()
  })
  it('rejects malformed alarms', async () => {
    const input = event()
    input.Records[0].Sns.Message = '{}'
    await expect(handler(input)).rejects.toThrow()
    expect(mocks.slack).not.toHaveBeenCalled()
  })
  it('fails for retries without exposing secret errors', async () => {
    mocks.slack.mockRejectedValue(new Error('secret webhook URL'))
    await expect(handler(event())).rejects.toThrow(
      /^CloudWatch alarm could not be delivered to Slack$/
    )
  })
})
