import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const dir = path.dirname(fileURLToPath(import.meta.url))
const terraform = readFileSync(
  path.resolve(dir, '../infra/main.tf'),
  'utf8'
)
const alarms =
  terraform.match(
    /^resource "aws_cloudwatch_metric_alarm" "\w+" \{[\s\S]*?^\}/gm
  ) ?? []

describe('analytics infrastructure', () => {
  it('expires raw MCP usage objects and cleans noncurrent versions bucket-wide', () => {
    const rawUsageRule = terraform.match(
      /rule \{[\s\S]*?id\s+=\s+"expire-mcp-usage-raw"[\s\S]*?^ {2}\}/m
    )?.[0]

    // Raw usage keys are unique (write-once), so this rule only expires current
    // versions; noncurrent cleanup is handled by the bucket-wide rule below.
    expect(rawUsageRule).toContain('expiration {')
    expect(rawUsageRule).not.toContain('noncurrent_version_expiration')

    const noncurrentRule = terraform.match(
      /rule \{[\s\S]*?id\s+=\s+"expire-noncurrent-versions"[\s\S]*?^ {2}\}/m
    )?.[0]

    expect(noncurrentRule).toMatch(
      /filter \{\}\s+noncurrent_version_expiration \{\s+noncurrent_days\s+=\s+\d+\s+\}/
    )
  })

  it('gives the snapshot generator enough timeout for its Athena queries', () => {
    // Up to seven Athena queries run one after another (page-view rollup
    // refresh, the concurrent trend reads, three MCP queries, then two
    // component-usage queries when enabled), each waiting up to 2 minutes.
    const snapshotLambda = terraform.match(
      /resource "aws_lambda_function" "snapshot" \{[\s\S]*?^\}/m
    )?.[0]
    const timeout = Number(
      snapshotLambda?.match(/timeout\s+=\s+(\d+)/)?.[1]
    )

    expect(timeout).toBeGreaterThanOrEqual(7 * 120)
  })

  it('notifies an SNS topic from every snapshot alarm, with an optional email subscription', () => {
    expect(terraform).toContain(
      'resource "aws_sns_topic" "snapshot_alerts"'
    )

    const subscription = terraform.match(
      /resource "aws_sns_topic_subscription" "snapshot_alerts_email" \{[\s\S]*?^\}/m
    )?.[0]
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

  it('expires raw portal-view objects on the portal-views/ prefix', () => {
    const rawRule = terraform.match(
      /rule \{[\s\S]*?id\s+=\s+"expire-portal-views-raw"[\s\S]*?^ {2}\}/m
    )?.[0]

    expect(rawRule).toMatch(/prefix\s+=\s+"portal-views\/"/)
    expect(rawRule).toMatch(/expiration \{\s+days\s+=\s+395\s+\}/)
    expect(rawRule).not.toContain('noncurrent_version_expiration')
  })

  it('defines a durable portal_views_daily rollup with no expiry rule', () => {
    expect(terraform).toContain(
      'resource "aws_glue_catalog_table" "portal_views_daily"'
    )
    expect(terraform).toMatch(
      /GLUE_TABLE_PORTAL_VIEWS_DAILY\s+=\s+aws_glue_catalog_table\.portal_views_daily\.name/
    )

    // The durable rollup must NOT have its own expiration rule, or history would
    // be lost the same way the raw prefix is trimmed.
    expect(terraform).not.toMatch(/prefix\s+=\s+"portal-views-daily\/"/)
  })

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

  it('expires raw component-usage objects on the component-usage/ prefix', () => {
    const rawUsageRule = terraform.match(
      /rule \{[\s\S]*?id\s+=\s+"expire-component-usage-raw"[\s\S]*?^ {2}\}/m
    )?.[0]

    expect(rawUsageRule).toMatch(/prefix\s+=\s+"component-usage\/"/)
    expect(rawUsageRule).toContain('expiration {')
    expect(rawUsageRule).not.toContain('noncurrent_version_expiration')
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

  it('defines a durable component_usage_daily rollup with no expiry rule', () => {
    expect(terraform).toContain(
      'resource "aws_glue_catalog_table" "component_usage_daily"'
    )
    expect(terraform).toMatch(
      /GLUE_TABLE_COMPONENT_USAGE_DAILY\s+=\s+aws_glue_catalog_table\.component_usage_daily\.name/
    )

    // The durable rollup must NOT have its own expiration rule, or history would
    // be lost the same way the raw prefix is trimmed.
    expect(terraform).not.toMatch(/prefix\s+=\s+"component-usage-daily\/"/)
  })

  it('locks the dashboard origin to the Akamai edge via a viewer-request function', () => {
    // The function validates the shared X-Edge-Auth secret Akamai injects.
    const originLock = terraform.match(
      /resource "aws_cloudfront_function" "dashboard_edge_auth" \{[\s\S]*?^\}/m
    )?.[0]

    expect(originLock).toContain('functions/dashboard-edge-auth.js.tftpl')
    expect(originLock).toMatch(
      /edge_auth_secret\s+=\s+jsonencode\(var\.edge_auth_secret\)/
    )

    // It must run on every viewer request to the dashboard distribution.
    const distribution = terraform.match(
      /resource "aws_cloudfront_distribution" "dashboard" \{[\s\S]*?^\}/m
    )?.[0]
    const association = distribution?.match(
      /function_association \{[\s\S]*?\}/
    )?.[0]

    expect(association).toMatch(/event_type\s+=\s+"viewer-request"/)
    expect(association).toContain(
      'aws_cloudfront_function.dashboard_edge_auth.arn'
    )
  })

  it('requires TLS on both buckets', () => {
    const requireTls = terraform.match(
      /data "aws_iam_policy_document" "require_tls" \{[\s\S]*?^\}/m
    )?.[0]
    const dataPolicy = terraform.match(
      /resource "aws_s3_bucket_policy" "data" \{[\s\S]*?^\}/m
    )?.[0]
    const dashboardPolicy = terraform.match(
      /data "aws_iam_policy_document" "dashboard" \{[\s\S]*?^\}/m
    )?.[0]

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

  it('creates the dashboard role with the OIDC boundary, trusted only by Lambda', () => {
    const role = terraform.match(
      /resource "aws_iam_role" "dashboard" \{[\s\S]*?^\}/m
    )?.[0]
    const assume = terraform.match(
      /data "aws_iam_policy_document" "dashboard_assume" \{[\s\S]*?^\}/m
    )?.[0]

    expect(role).toMatch(
      /permissions_boundary\s+=\s+".*:policy\/tlz\/oidc-tooling-github-permissionboundarypolicy"/
    )
    expect(role).toContain(
      'data.aws_iam_policy_document.dashboard_assume.json'
    )
    expect(assume?.match(/identifiers\s+=\s+\[.*\]/g)).toEqual([
      'identifiers = ["lambda.amazonaws.com"]',
    ])
  })

  it('attaches only the deploy-approved policies to the dashboard role', () => {
    const attachedPolicies = (
      terraform.match(
        /^resource "aws_iam_role_policy_attachment" "\w+" \{[\s\S]*?^\}/gm
      ) ?? []
    )
      .filter((block) => block.includes('aws_iam_role.dashboard.name'))
      .map((block) => block.match(/policy_arn\s+=\s+"(.*)"/)?.[1])

    expect(attachedPolicies).toEqual([
      'arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/tooling/eufemia-${var.environment}-dashboard-snapshot-read',
      'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    ])
    expect(terraform).not.toMatch(/resource "aws_iam_role_policy" /)
  })
})
