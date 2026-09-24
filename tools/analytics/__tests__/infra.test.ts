import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const dir = path.dirname(fileURLToPath(import.meta.url))
const terraform = readFileSync(
  path.resolve(dir, '../infra/main.tf'),
  'utf8'
)

describe('analytics infrastructure', () => {
  it('expires raw MCP usage objects and cleans noncurrent versions bucket-wide', () => {
    const rawUsageRule = terraform.match(
      /rule \{[\s\S]*?id\s+= "expire-mcp-usage-raw"[\s\S]*?^ {2}\}/m
    )?.[0]

    // Raw usage keys are unique (write-once), so this rule only expires current
    // versions; noncurrent cleanup is handled by the bucket-wide rule below.
    expect(rawUsageRule).toContain('expiration {')
    expect(rawUsageRule).not.toContain('noncurrent_version_expiration')

    const noncurrentRule = terraform.match(
      /rule \{[\s\S]*?id\s+= "expire-noncurrent-versions"[\s\S]*?^ {2}\}/m
    )?.[0]

    expect(noncurrentRule).toMatch(
      /filter \{\}\s+noncurrent_version_expiration \{\s+noncurrent_days = \d+\s+\}/
    )
  })

  it('gives the snapshot generator enough timeout for its Athena queries', () => {
    // The generator runs the portal read, the retention rollup refresh, and the
    // MCP section queries; the timeout must cover the deepest concurrent chain.
    const snapshotLambda = terraform.match(
      /resource "aws_lambda_function" "snapshot" \{[\s\S]*?^\}/m
    )?.[0]
    const timeout = Number(
      snapshotLambda?.match(/timeout\s+=\s+(\d+)/)?.[1]
    )

    expect(timeout).toBeGreaterThanOrEqual(90)
  })

  it('notifies an SNS topic from every snapshot alarm, with an optional email subscription', () => {
    expect(terraform).toContain(
      'resource "aws_sns_topic" "snapshot_alerts"'
    )

    const subscription = terraform.match(
      /resource "aws_sns_topic_subscription" "snapshot_alerts_email" \{[\s\S]*?^\}/m
    )?.[0]
    expect(subscription).toContain(
      'count     = var.snapshot_alert_email != "" ? 1 : 0'
    )
    expect(subscription).toContain('protocol  = "email"')

    for (const alarm of [
      'snapshot_errors',
      'snapshot_not_running',
      'snapshot_empty',
      'snapshot_mcp_build_failed',
      'snapshot_component_usage_build_failed',
      'snapshot_portal_views_rollup_failed',
    ]) {
      const block = terraform.match(
        new RegExp(
          `resource "aws_cloudwatch_metric_alarm" "${alarm}" \\{[\\s\\S]*?^\\}`,
          'm'
        )
      )?.[0]
      expect(block, `${alarm} alarm block`).toContain(
        'alarm_actions       = [aws_sns_topic.snapshot_alerts.arn]'
      )
    }
  })

  it('expires raw portal-view objects on the portal-views/ prefix', () => {
    const rawRule = terraform.match(
      /rule \{[\s\S]*?id\s+= "expire-portal-views-raw"[\s\S]*?^ {2}\}/m
    )?.[0]

    expect(rawRule).toContain('prefix = "portal-views/"')
    expect(rawRule).toMatch(/expiration \{\s+days = 395\s+\}/)
    expect(rawRule).not.toContain('noncurrent_version_expiration')
  })

  it('defines a durable portal_views_daily rollup with no expiry rule', () => {
    expect(terraform).toContain(
      'resource "aws_glue_catalog_table" "portal_views_daily"'
    )
    expect(terraform).toMatch(
      /GLUE_TABLE_PORTAL_VIEWS_DAILY\s+= aws_glue_catalog_table\.portal_views_daily\.name/
    )

    // The durable rollup must NOT have its own expiration rule, or history would
    // be lost the same way the raw prefix is trimmed.
    expect(terraform).not.toContain('prefix = "portal-views-daily/"')
  })

  it('alarms on a persistent portal-view rollup-refresh failure', () => {
    expect(terraform).toContain(
      'resource "aws_cloudwatch_metric_alarm" "snapshot_portal_views_rollup_failed"'
    )
    const alarm = terraform.match(
      /resource "aws_cloudwatch_metric_alarm" "snapshot_portal_views_rollup_failed" \{[\s\S]*?^\}/m
    )?.[0]
    expect(alarm).toContain(
      'metric_name         = "PortalViewsRollupFailure"'
    )
  })

  it('expires raw component-usage objects on the component-usage/ prefix', () => {
    const rawUsageRule = terraform.match(
      /rule \{[\s\S]*?id\s+= "expire-component-usage-raw"[\s\S]*?^ {2}\}/m
    )?.[0]

    expect(rawUsageRule).toContain('prefix = "component-usage/"')
    expect(rawUsageRule).toContain('expiration {')
    expect(rawUsageRule).not.toContain('noncurrent_version_expiration')
  })

  it('defines the component_usage Glue table and wires it into the generator', () => {
    expect(terraform).toContain(
      'resource "aws_glue_catalog_table" "component_usage"'
    )
    expect(terraform).toMatch(
      /GLUE_TABLE_COMPONENT_USAGE\s+= aws_glue_catalog_table\.component_usage\.name/
    )
  })

  it('defines a durable component_usage_daily rollup with no expiry rule', () => {
    expect(terraform).toContain(
      'resource "aws_glue_catalog_table" "component_usage_daily"'
    )
    expect(terraform).toMatch(
      /GLUE_TABLE_COMPONENT_USAGE_DAILY\s+= aws_glue_catalog_table\.component_usage_daily\.name/
    )

    // The durable rollup must NOT have its own expiration rule, or history would
    // be lost the same way the raw prefix is trimmed.
    expect(terraform).not.toContain('prefix = "component-usage-daily/"')
  })

  it('locks the dashboard origin to the Akamai edge via a viewer-request function', () => {
    // The function validates the shared X-Edge-Auth secret Akamai injects.
    const originLock = terraform.match(
      /resource "aws_cloudfront_function" "dashboard_edge_auth" \{[\s\S]*?^\}/m
    )?.[0]

    expect(originLock).toContain('functions/dashboard-edge-auth.js.tftpl')
    expect(originLock).toContain(
      'edge_auth_secret = jsonencode(var.edge_auth_secret)'
    )

    // It must run on every viewer request to the dashboard distribution.
    const distribution = terraform.match(
      /resource "aws_cloudfront_distribution" "dashboard" \{[\s\S]*?^\}/m
    )?.[0]
    const association = distribution?.match(
      /function_association \{[\s\S]*?\}/
    )?.[0]

    expect(association).toContain('event_type   = "viewer-request"')
    expect(association).toContain(
      'aws_cloudfront_function.dashboard_edge_auth.arn'
    )
  })
})
