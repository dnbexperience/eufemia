import { setTimeout } from 'node:timers/promises'
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import { readSecret } from './secrets.ts'
import { checkCdn } from '../../assets/check-cdn.ts'
import { checkHttpMcp } from '../../mcp-lambda/src/check-http.ts'
import { runMonitor } from './monitor.ts'
import type { Service, State } from './monitor.ts'
import { sendSlack } from './slack.ts'

const dynamodb = new DynamoDBClient({
  maxAttempts: 2,
  requestHandler: { connectionTimeout: 3000, requestTimeout: 10_000 },
})
function required(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error('Missing monitor configuration: ' + name)
  }
  return value
}

function metric(service: Service, name: string, value: number) {
  process.stdout.write(
    JSON.stringify({
      _aws: {
        Timestamp: Date.now(),
        CloudWatchMetrics: [
          {
            Namespace: 'Eufemia/ServiceMonitoring',
            Dimensions: [['FunctionName']],
            Metrics: [{ Name: name, Unit: 'Count' }],
          },
        ],
      },
      Service: service,
      FunctionName: required('AWS_LAMBDA_FUNCTION_NAME'),
      [name]: value,
    }) + '\n'
  )
}

export async function handler() {
  const service = required('SERVICE')
  if (service !== 'CDN' && service !== 'MCP') {
    throw new Error('Invalid monitor service')
  }
  try {
    const table = required('STATE_TABLE')
    const notifications = required('NOTIFICATIONS_ENABLED') === 'true'
    const key = { service: { S: service } }
    const signal = AbortSignal.timeout(330_000)
    const request: typeof fetch = (input, init) =>
      fetch(input, {
        ...init,
        signal: init?.signal
          ? AbortSignal.any([signal, init.signal])
          : signal,
      })
    const sleep = async (ms: number) => {
      if (!signal.aborted) {
        await setTimeout(ms, undefined, { signal }).catch(() => {})
      }
    }
    const report = await runMonitor(service, notifications, {
      load: async () => {
        const result = await dynamodb.send(
          new GetItemCommand({
            TableName: table,
            Key: key,
            ConsistentRead: true,
          })
        )
        return result.Item?.state?.S
          ? (JSON.parse(result.Item.state.S) as State)
          : {}
      },
      save: async (state) => {
        await dynamodb.send(
          new PutItemCommand({
            TableName: table,
            Item: { ...key, state: { S: JSON.stringify(state) } },
          })
        )
      },
      check: async () => {
        let githubToken: string | undefined
        let tokenUnavailable = false
        if (service === 'MCP' && process.env.GITHUB_TOKEN_SECRET_ARN) {
          try {
            githubToken = await readSecret(
              process.env.GITHUB_TOKEN_SECRET_ARN
            )
          } catch {
            tokenUnavailable = true
          }
        }
        const options = { fetch: request, sleep }
        const report =
          service === 'CDN'
            ? await checkCdn(options)
            : await checkHttpMcp({
                ...options,
                githubToken,
              })
        if (tokenUnavailable) {
          report.checks.push({
            name: 'GitHub verification credential',
            ok: false,
            detail: 'Configured GitHub credential could not be read',
          })
          report.status = 'unhealthy'
        }
        process.stdout.write(JSON.stringify({ service, report }) + '\n')
        return report
      },
      notify: async (text) => {
        const webhook = await readSecret(
          required('SLACK_WEBHOOK_SECRET_ARN')
        )
        await sendSlack(webhook, text)
      },
      completed: (report) => {
        metric(service, 'Completed', 1)
        metric(service, 'Unhealthy', report.status === 'unhealthy' ? 1 : 0)
      },
    })
    return { service, status: report.status }
  } catch {
    // SDK and HTTP errors may contain credentials or notification URLs.
    metric(service, 'MonitorError', 1)
    throw new Error(
      'Service monitor could not complete. Check monitor configuration and alarms.'
    )
  }
}
