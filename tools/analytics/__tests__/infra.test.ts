import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const dir = path.dirname(fileURLToPath(import.meta.url))
const terraform = readFileSync(
  path.resolve(dir, '../infra/main.tf'),
  'utf8'
)

const terraformBlock = (header: string) =>
  terraform.match(new RegExp(`^${header} \\{[\\s\\S]*?^\\}`, 'm'))?.[0]

const resourceBlocks = (type: string) =>
  terraform.match(
    new RegExp(`^resource "${type}" "\\w+" \\{[\\s\\S]*?^\\}`, 'gm')
  ) ?? []

const lifecycleRule = (id: string) =>
  terraform.match(
    new RegExp(
      `^ {2}rule \\{\\s+id\\s+=\\s+"${id}"[\\s\\S]*?^ {2}\\}`,
      'm'
    )
  )?.[0]

const alarms = resourceBlocks('aws_cloudwatch_metric_alarm')

describe('analytics infrastructure', () => {
  it.each(['portal-views', 'mcp-usage', 'component-usage'])(
    'expires raw %s objects after 395 days',
    (prefix) => {
      const rule = lifecycleRule(`expire-${prefix}-raw`)

      // Raw keys are write-once; noncurrent cleanup is the bucket-wide rule.
      expect(rule).toMatch(new RegExp(`prefix\\s+=\\s+"${prefix}/"`))
      expect(rule).toMatch(/expiration \{\s+days\s+=\s+395\s+\}/)
      expect(rule).not.toContain('noncurrent_version_expiration')
    }
  )

  it('cleans noncurrent versions bucket-wide', () => {
    expect(lifecycleRule('expire-noncurrent-versions')).toMatch(
      /filter \{\}\s+noncurrent_version_expiration \{\s+noncurrent_days\s+=\s+\d+\s+\}/
    )
  })

  it('gives the snapshot generator enough timeout for its Athena queries', () => {
    // Up to seven Athena queries run one after another (page-view rollup
    // refresh, the concurrent trend reads, three MCP queries, then two
    // component-usage queries when enabled), each waiting up to 2 minutes.
    const snapshotLambda = terraformBlock(
      'resource "aws_lambda_function" "snapshot"'
    )
    const timeout = Number(
      snapshotLambda?.match(/timeout\s+=\s+(\d+)/)?.[1]
    )

    expect(timeout).toBeGreaterThanOrEqual(7 * 120)
  })

  it('notifies an SNS topic from every snapshot alarm, with an optional email subscription', () => {
    expect(terraform).toContain(
      'resource "aws_sns_topic" "snapshot_alerts"'
    )

    const subscription = terraformBlock(
      'resource "aws_sns_topic_subscription" "snapshot_alerts_email"'
    )
    expect(subscription).toMatch(
      /count\s+=\s+var\.snapshot_alert_email != "" \? 1 : 0/
    )
    expect(subscription).toMatch(/protocol\s+=\s+"email"/)

    expect(alarms.length).toBeGreaterThan(0)
    for (const alarm of alarms) {
      expect(alarm, `${alarm.split('\n')[0]}`).toMatch(
        /^\s+alarm_actions\s+=\s+\[aws_sns_topic\.snapshot_alerts\.arn\]$/m
      )
    }
  })

  it('alarms when the snapshot Lambda fails or stops running', () => {
    for (const name of ['snapshot_errors', 'snapshot_not_running']) {
      expect(terraform).toContain(
        `resource "aws_cloudwatch_metric_alarm" "${name}"`
      )
    }
  })

  it.each([
    {
      table: 'portal_views_daily',
      envVar: 'GLUE_TABLE_PORTAL_VIEWS_DAILY',
      prefix: 'portal-views-daily/',
    },
    {
      table: 'component_usage_daily',
      envVar: 'GLUE_TABLE_COMPONENT_USAGE_DAILY',
      prefix: 'component-usage-daily/',
    },
  ])(
    'defines a durable $table rollup with no expiry rule',
    ({ table, envVar, prefix }) => {
      expect(terraform).toContain(
        `resource "aws_glue_catalog_table" "${table}"`
      )
      expect(terraform).toMatch(
        new RegExp(
          `${envVar}\\s+=\\s+aws_glue_catalog_table\\.${table}\\.name`
        )
      )

      // An expiry rule on the rollup prefix would delete its history.
      expect(terraform).not.toMatch(
        new RegExp(`prefix\\s+=\\s+"${prefix}"`)
      )
    }
  )

  it('pairs every emitted metric with an alarm, and every custom-metric alarm with an emitted metric', () => {
    const snapshotSource = readFileSync(
      path.resolve(dir, '../src/lambda/snapshot.ts'),
      'utf8'
    )
    const namespace = snapshotSource.match(
      /const METRIC_NAMESPACE = '([^']+)'/
    )?.[1]
    const metricType =
      snapshotSource.split('type MetricName =')[1]?.split('\n\n')[0] ?? ''
    const metricNames = [...metricType.matchAll(/'(\w+)'/g)].map(
      ([, name]) => name
    )
    const namespaceLine = new RegExp(
      `^\\s+namespace\\s+=\\s+"${namespace}"$`,
      'm'
    )

    expect(metricNames.length).toBeGreaterThan(0)

    for (const metric of metricNames) {
      const alarm = alarms.find((block) =>
        new RegExp(`^\\s+metric_name\\s+=\\s+"${metric}"$`, 'm').test(
          block
        )
      )

      expect(alarm, `${metric} alarm`).toMatch(namespaceLine)
      expect(alarm, `${metric} alarm`).toMatch(
        /^\s+dimensions\s+=\s+\{\s*FunctionName\s+=\s+aws_lambda_function\.snapshot\.function_name\s*\}$/m
      )
      expect(snapshotSource, `${metric} emitted`).toMatch(
        new RegExp(`^\\s*emitMetric\\('${metric}'`, 'm')
      )
    }

    const customMetricAlarms = alarms.filter((block) =>
      namespaceLine.test(block)
    )
    for (const alarm of customMetricAlarms) {
      expect(metricNames, `${alarm.split('\n')[0]}`).toContain(
        alarm.match(/^\s+metric_name\s+=\s+"(\w+)"$/m)?.[1]
      )
    }
  })

  it('defines the component_usage Glue table and wires it into the generator', () => {
    expect(terraform).toContain(
      'resource "aws_glue_catalog_table" "component_usage"'
    )
    expect(terraform).toMatch(
      /GLUE_TABLE_COMPONENT_USAGE\s+=\s+aws_glue_catalog_table\.component_usage\.name/
    )
    expect(terraform).toMatch(
      /COMPONENT_USAGE_ENABLED\s+=\s+"(true|false)"/
    )
  })

  it('locks the dashboard origin to the Akamai edge via a viewer-request function', () => {
    // The function validates the shared X-Edge-Auth secret Akamai injects.
    const originLock = terraformBlock(
      'resource "aws_cloudfront_function" "dashboard_edge_auth"'
    )

    expect(originLock).toContain('functions/dashboard-edge-auth.js.tftpl')
    expect(originLock).toMatch(
      /edge_auth_secret\s+=\s+jsonencode\(var\.edge_auth_secret\)/
    )

    // It must run on every viewer request to the dashboard distribution.
    const distribution = terraformBlock(
      'resource "aws_cloudfront_distribution" "dashboard"'
    )
    const association = distribution?.match(
      /function_association \{[\s\S]*?\}/
    )?.[0]

    expect(association).toMatch(/event_type\s+=\s+"viewer-request"/)
    expect(association).toContain(
      'aws_cloudfront_function.dashboard_edge_auth.arn'
    )
  })

  it('requires TLS on both buckets', () => {
    const requireTls = terraformBlock(
      'data "aws_iam_policy_document" "require_tls"'
    )
    const dataPolicy = terraformBlock(
      'resource "aws_s3_bucket_policy" "data"'
    )
    const dashboardPolicy = terraformBlock(
      'data "aws_iam_policy_document" "dashboard"'
    )

    expect(requireTls).toMatch(/data\s+=\s+aws_s3_bucket\.data\.arn/)
    expect(requireTls).toMatch(
      /dashboard\s+=\s+aws_s3_bucket\.dashboard\.arn/
    )
    expect(requireTls).toMatch(/effect\s+=\s+"Deny"/)
    expect(requireTls).toMatch(
      /resources\s+=\s+\[each\.value, "\$\{each\.value\}\/\*"\]/
    )
    expect(requireTls).toMatch(
      /variable\s+=\s+"aws:SecureTransport"\s+values\s+=\s+\["false"\]/
    )

    expect(dataPolicy).toContain(
      'data.aws_iam_policy_document.require_tls["data"].json'
    )
    expect(dashboardPolicy).toContain(
      'data.aws_iam_policy_document.require_tls["dashboard"].json'
    )
  })

  it('creates the dashboard role with the OIDC boundary, Lambda-only trust and delete protection', () => {
    const role = terraformBlock('resource "aws_iam_role" "dashboard"')
    const assume = terraformBlock(
      'data "aws_iam_policy_document" "dashboard_assume"'
    )

    expect(role).toMatch(
      /permissions_boundary\s+=\s+".*:policy\/tlz\/oidc-tooling-github-permissionboundarypolicy"/
    )
    expect(role).toContain(
      'data.aws_iam_policy_document.dashboard_assume.json'
    )
    expect(assume?.match(/identifiers\s+=\s+\[.*\]/g)).toEqual([
      'identifiers = ["lambda.amazonaws.com"]',
    ])
    expect(role).toMatch(/^\s+prevent_destroy\s+=\s+true$/m)
  })

  it('attaches only the deploy-approved policies to the dashboard role', () => {
    const attachedPolicies = resourceBlocks(
      'aws_iam_role_policy_attachment'
    )
      .filter((block) => block.includes('aws_iam_role.dashboard.'))
      .map((block) => block.match(/policy_arn\s+=\s+"(.*)"/)?.[1])

    expect(attachedPolicies).toEqual([
      'arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/tooling/eufemia-${var.environment}-dashboard-snapshot-read',
      'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    ])
    expect(terraform).not.toMatch(
      /resource "aws_iam_role_policy" |resource "aws_iam_policy_attachment" |managed_policy_arns|inline_policy/
    )
  })
})
