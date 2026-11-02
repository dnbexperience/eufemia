import { setTimeout } from 'node:timers/promises'
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import { readSecret } from './secrets.ts'
import { checkCdn } from '../../assets/check-cdn.ts'
import { checkHttpMcp } from '../../mcp-lambda/src/check-http.ts'
import { checkAnalytics } from '../../analytics/src/monitor/check-analytics.ts'
import { runMonitor, services } from './monitor.ts'
import type { Service, State } from './monitor.ts'
import type { Report } from '../../monitoring/report-incident.ts'
import { publishObservation } from './publish-observation.ts'
import { logFailure } from './diagnostics.ts'

const dynamodb = new DynamoDBClient({
  maxAttempts: 2,
  requestHandler: {
    connectionTimeout: 3000,
    requestTimeout: 10_000,
    throwOnRequestTimeout: true,
  },
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
  const service = required('SERVICE') as Service
  if (!services.includes(service)) {
    throw new Error('Invalid monitor service')
  }
  let stage = 'configuration'
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
    const report = await runMonitor(notifications, {
      load: async () => {
        stage = 'load'
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
        stage = 'save'
        await dynamodb.send(
          new PutItemCommand({
            TableName: table,
            Item: { ...key, state: { S: JSON.stringify(state) } },
          })
        )
      },
      check: async () => {
        stage = 'check'
        const unreadable: string[] = []
        async function credential(label: string, secret?: string) {
          if (!secret) {
            return undefined
          }
          try {
            return await readSecret(secret)
          } catch (error) {
            logFailure(service, label, error)
            unreadable.push(label)
            return undefined
          }
        }
        const options = { fetch: request, sleep }
        let report: Report
        if (service === 'CDN') {
          report = await checkCdn(options)
        } else {
          const githubToken = await credential(
            'GitHub verification credential',
            process.env.GITHUB_TOKEN_SECRET_ARN
          )
          report =
            service === 'MCP'
              ? await checkHttpMcp({ ...options, githubToken })
              : await checkAnalytics({
                  ...options,
                  githubToken,
                  gheRepository: process.env.ANALYTICS_DEPLOY_REPOSITORY,
                  gheToken: await credential(
                    'GHE deploy credential',
                    required('GHE_TOKEN_SECRET')
                  ),
                })
        }
        for (const label of unreadable) {
          report.checks.push({
            name: label,
            ok: false,
            detail: 'Configured credential could not be read',
          })
          report.status = 'unhealthy'
        }
        process.stdout.write(JSON.stringify({ service, report }) + '\n')
        return report
      },
      publish: async (report) => {
        stage = 'publish observation'
        await publishObservation(required('ALERT_TOPIC_ARN'), {
          kind: 'service',
          service,
          report,
        })
      },
      completed: (report) => {
        metric(service, 'Completed', 1)
        metric(service, 'Unhealthy', report.status === 'unhealthy' ? 1 : 0)
      },
    })
    return { service, status: report.status }
  } catch (error) {
    logFailure(service, stage, error)
    metric(service, 'MonitorError', 1)
    // eslint-disable-next-line preserve-caught-error -- Causes may contain secret URLs or credentials.
    throw new Error(
      'Service monitor could not complete. Check monitor configuration and alarms.'
    )
  }
}
