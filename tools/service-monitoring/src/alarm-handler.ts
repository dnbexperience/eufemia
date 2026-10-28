import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import { readSecret } from './secrets.ts'
import { parseSlackConfig, slackApi } from './slack-api.ts'
import { processNotification } from './notifications.ts'
import type { NotificationState, Observation } from './notifications.ts'
import { logFailure } from './diagnostics.ts'

const db = new DynamoDBClient({
  maxAttempts: 2,
  requestHandler: {
    connectionTimeout: 3000,
    requestTimeout: 10000,
    throwOnRequestTimeout: true,
  },
})
type Event = { Records: { Sns: { TopicArn: string; Message: string } }[] }

function parseObservation(message: string): Observation {
  const value = JSON.parse(message)
  if (value.kind === 'service') {
    if (
      !['CDN', 'MCP'].includes(value.service) ||
      !['healthy', 'unhealthy', 'pending'].includes(
        value.report?.status
      ) ||
      !Number.isFinite(Date.parse(value.report?.checkedAt)) ||
      !Array.isArray(value.report?.checks) ||
      value.report.checks.some(
        (check: { name?: unknown; ok?: unknown }) =>
          typeof check.name !== 'string' || typeof check.ok !== 'boolean'
      )
    ) {
      throw new Error('Invalid service observation')
    }
    return value as Observation
  }
  if (
    typeof value.AlarmName !== 'string' ||
    !['ALARM', 'OK'].includes(value.NewStateValue) ||
    !Number.isFinite(Date.parse(value.StateChangeTime))
  ) {
    throw new Error('Invalid CloudWatch observation')
  }
  return {
    kind: 'alarm',
    name: value.AlarmName,
    status: value.NewStateValue,
    at: value.StateChangeTime,
  }
}

export async function handler(event: Event) {
  if (process.env.NOTIFICATIONS_ENABLED !== 'true') {
    return
  }
  let stage = 'configuration'
  try {
    const topic = process.env.ALERT_TOPIC_ARN
    const table = process.env.STATE_TABLE
    const secret = process.env.SLACK_BOT_SECRET_ARN
    if (
      !topic ||
      !table ||
      !secret ||
      !Array.isArray(event.Records) ||
      !event.Records.length
    ) {
      throw new Error('Invalid notification configuration')
    }
    const records = event.Records.map((record) => {
      if (record.Sns.TopicArn !== topic) {
        throw new Error('Unexpected notification topic')
      }
      return parseObservation(record.Sns.Message)
    })
    stage = 'Slack bot configuration'
    const slack = slackApi(parseSlackConfig(await readSecret(secret)))
    const key = { service: { S: 'notifications' } }
    for (const observation of records) {
      stage = 'notification state and Slack delivery'
      await processNotification(observation, {
        load: async () => {
          const item = await db.send(
            new GetItemCommand({
              TableName: table,
              Key: key,
              ConsistentRead: true,
            })
          )
          return item.Item?.state?.S
            ? (JSON.parse(item.Item.state.S) as NotificationState)
            : { sources: {} }
        },
        save: async (state) => {
          await db.send(
            new PutItemCommand({
              TableName: table,
              Item: { ...key, state: { S: JSON.stringify(state) } },
            })
          )
        },
        ...slack,
      })
    }
  } catch (error) {
    logFailure('notifications', stage, error)
    // eslint-disable-next-line preserve-caught-error -- Causes may contain credentials.
    throw new Error('Monitoring notification could not complete')
  }
}
