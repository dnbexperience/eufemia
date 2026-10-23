import { readSecret } from './secrets.ts'
import { sendSlack } from './slack.ts'
import { logFailure } from './diagnostics.ts'

type Event = { Records: { Sns: { TopicArn: string; Message: string } }[] }

export async function handler(event: Event) {
  if (process.env.NOTIFICATIONS_ENABLED !== 'true') {
    return
  }
  let stage = 'alarm input'
  try {
    const secretArn = process.env.SLACK_WEBHOOK_SECRET_ARN
    const topicArn = process.env.ALERT_TOPIC_ARN
    if (
      !secretArn ||
      !topicArn ||
      !Array.isArray(event.Records) ||
      !event.Records.length
    ) {
      throw new Error('Invalid notification configuration or event')
    }
    stage = 'webhook secret'
    const webhook = await readSecret(secretArn)
    for (const record of event.Records) {
      stage = 'alarm input'
      if (record.Sns.TopicArn !== topicArn) {
        throw new Error('Unexpected notification topic')
      }
      const alarm = JSON.parse(record.Sns.Message)
      if (
        typeof alarm.AlarmName !== 'string' ||
        typeof alarm.NewStateReason !== 'string' ||
        !['ALARM', 'OK'].includes(alarm.NewStateValue)
      ) {
        throw new Error('Invalid CloudWatch alarm')
      }
      stage = 'Slack delivery'
      await sendSlack(
        webhook,
        [
          'Eufemia monitoring ' +
            (alarm.NewStateValue === 'ALARM'
              ? 'needs attention'
              : 'recovered') +
            '.',
          alarm.AlarmName,
          alarm.NewStateReason,
          'Inspect the monitoring Lambda logs, Scheduler delivery and failure queue in AWS.',
        ].join('\n')
      )
    }
  } catch (error) {
    logFailure('alarms', stage, error)
    // eslint-disable-next-line preserve-caught-error -- Causes may contain the webhook URL.
    throw new Error('CloudWatch alarm could not be delivered to Slack')
  }
}
