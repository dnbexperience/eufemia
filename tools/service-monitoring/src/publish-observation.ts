import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'
import type { Observation } from './notifications.ts'
const sns = new SNSClient({
  maxAttempts: 2,
  requestHandler: {
    connectionTimeout: 3000,
    requestTimeout: 10000,
    throwOnRequestTimeout: true,
  },
})
export async function publishObservation(
  topic: string,
  event: Observation
) {
  await sns.send(
    new PublishCommand({ TopicArn: topic, Message: JSON.stringify(event) })
  )
}
